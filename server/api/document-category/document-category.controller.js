'use strict';

import _ from 'lodash';
import path from 'path';
import stream from 'stream';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import async from 'async';
import DocumentCategory from './document-category.model';
import {allDocumentTypes} from '../document-type/document-type.controller';
import * as Auth from '../../auth/auth.service';
import gridfs from '../../components/gridfs';

function handleError(req, res) {
  return function(statusCode, err) {
    statusCode = statusCode || 500;

    if (err) {
      req.log.error(err);
      res.status(statusCode).send(err);
    } else {
      res.sendStatus(statusCode);
    }
  };
}

function handleEntityNotFound(res) {
  return function(request) {
    if (!request) {
      throw(404);
    }

    return request;
  };
}

function handleUserNotAuthorized(req, res) {
  return function(entity) {
    if (Auth.meetsRequirements(req.user.role, 'admin')) {
      return entity;
    }

    if (Auth.meetsRequirements(req.user.role, 'adminMdph') && req.mdph._id.equals(req.user.mdph)) {
      return entity;
    }

    throw(403);
  };
}

function filterList() {
  return function(list) {
    let filteredList = [];
    let found;

    _.forEach(allDocumentTypes, function(documentType) {
      found = false;
      _.forEach(list, function(category) {
        if (category.documentTypes && category.documentTypes.indexOf(documentType.id) >= 0) {
          found = true;
        }
      });

      if (!found) {
        filteredList.push(documentType);
      }
    });

    return filteredList;
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    res.status(statusCode).json(entity);
    return null;
  };
}

function comparePosition(catA, catB) {
  return catA.position - catB.position;
}

function populateCategoryBarcode(category) {
  return new Promise(function(resolve, reject) {
    if (!category.barcode) {
      return resolve(category);
    }

    let gfs = gridfs();
    gfs.findOne({_id: category.barcode}, function(err, file) {
      if (err) {
        return reject(err);
      }

      category.barcode = file;
      return resolve(category);
    });
  });
}

function createSpecialCategoryIfNecessary(options) {
  return function(category) {
    if (category) {
      return category;
    }

    if (options.unclassified) {
      options.label = 'Documents non catégorisés';
    } else {
      options.label = 'Document de la demande';
    }

    return DocumentCategory.create(options);
  };
}

function getOrCreateSpecialCategory(options) {
  return DocumentCategory
    .findOne(options)
    .lean()
    .exec()
    .then(createSpecialCategoryIfNecessary(options))
    .then(populateCategoryBarcode);
}

export function getUnclassifiedCategoryLocal(mdph) {
  return getOrCreateSpecialCategory({mdph: mdph._id, unclassified: true});
}

export function getUnclassifiedCategory(req, res) {
  getUnclassifiedCategoryLocal(req.mdph)
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function saveDocumentCategoryFile(req, res) {
  var gfs = gridfs();
  var file = req.file;
  var categoryId = req.params.categoryId;
  var logger = req.log;

  var writeStream = gfs.createWriteStream({
    filename: file.originalname,
    mimetype: file.mimetype
  });

  var bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  bufferStream.pipe(writeStream);

  writeStream.on('close', function(file) {
    DocumentCategory.findById(categoryId, function(err, category) {
      if (err) {
        req.log.error(err);
        return res.status(500).send(err);
      }

      if (!category) {
        return res.sendStatus(404);
      }

      if (category.barcode) {
        // remove existing file, only one allowed
        gfs.remove({_id: category.barcode}, function(err) {
          if (err) {
            req.log.error(err);
          }

          logger.info('Removed gfs file "' + category.barcode + '" for category "' + category._id + '"', category);
        });
      }

      category
        .set('barcode', file._id)
        .save(function(err, updated) {
          if (err) {
            req.log.error(err);
            return res.status(500).send(err);
          }

          return res.json(file);
        });
    });
  });
}

export function getDocumentCategoryFile(req, res) {
  DocumentCategory.findById(req.params.categoryId, function(err, category) {
    if (err) {
      req.log.error(err);
      return res.status(500).send(err);
    }

    if (!category) {
      return res.sendStatus(404);
    }

    if (category.barcode) {
      var gfs = gridfs();
      var readStream = gfs.createReadStream({_id: category.barcode});

      return readStream.pipe(res);
    } else {
      return res.sendStatus(200);
    }
  });
}

export function updateDocumentCategory(req, res) {
  DocumentCategory
    .findById(req.params.categoryId)
    .exec()
    .then(populateCategoryBarcode)
    .then(function(category) {
      if (!category) {
        return res.sendStatus(404);
      }

      return category
        .set('label', req.body.label)
        .save(function(err, updated) {
          return populateSingle(updated.toObject()).then(populated => res.json(populated));
        });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
}

export function removeDocumentCategory(req, res) {
  DocumentCategory
    .findById(req.params.categoryId)
    .remove()
    .exec(err => {
      if (err) {
        return res.status(500).send(err);
      }

      res.sendStatus(204);
    });
}

export function updateDocumentType(req, res) {
  if (!(req.body.newCategoryId || req.body.oldCategoryId)  || !req.body.documentType) {
    return res.status(500).send(); // TODO: status malformed request
  }

  async.parallel({
    old: function(cb) {
      DocumentCategory.findById(req.body.oldCategoryId).exec(cb);
    },

    new: function(cb) {
      DocumentCategory.findById(req.body.newCategoryId).exec(cb);
    }
  },
  function(err, results) {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.old) {
      results.old.update(
        { $pull: { documentTypes: req.body.documentType } }
      ).exec();
    }

    if (results.new) {
      results.new.update(
        { $push: { documentTypes: req.body.documentType } }
      ).exec();
    }

    res.status(200).send(results.new);
  });
}

export function showUncategorizedDocumentTypes(req, res) {
  DocumentCategory
    .find({mdph: req.mdph._id}).lean().exec()
    .then(filterList())
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

export function createNewDocumentCategory(req, res) {
  var newCategory = new DocumentCategory({
    mdph: req.mdph._id,
    position: req.body.position
  });

  newCategory.save()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

function populateSingle(category) {
  if (category.documentTypes && category.documentTypes.length > 0) {
    // Poor man's population
    let fullTypes = [];
    category.documentTypes.forEach(function(documentType) {
      fullTypes.push(_.find(allDocumentTypes, {id: documentType}));
    });

    category.documentTypes = fullTypes;
  }

  return populateCategoryBarcode(category);
}

function populateList(list) {
  return new Promise(function(resolve, reject) {
    Promise.map(list, populateSingle).then(function() {
      // Sort by position in the tree
      list.sort(comparePosition);
      return resolve(list);
    });
  });
}

export function showDocumentCategoriesPromise(mdph) {
  return DocumentCategory.find({mdph: mdph._id, unclassified: {$ne: true}}).lean().exec().then(populateList);
}

function createPdfCategoryIfNecessary(req) {
  return new Promise(function(resolve, reject) {
    DocumentCategory
      .findOne({mdph: req.mdph._id, required: true})
      .exec((err, result) => {
        if (err) return reject(err);
        if (result) return resolve(result);

        var requiredCategory = new DocumentCategory({mdph: req.mdph._id, required: true, label: 'Document de la demande'});

        requiredCategory.save((err, saved) => {
          if (err) return reject(err);

          DocumentCategory
            .find({mdph: req.mdph._id, unclassified: {$ne: true}}).lean().exec(function(err, list) {
              resolve(list);
            });
        });
      });
  });
}

export function showDocumentCategories(req, res) {
  createPdfCategoryIfNecessary(req)
    .then(() => {
      return showDocumentCategoriesPromise(req.mdph);
    })
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

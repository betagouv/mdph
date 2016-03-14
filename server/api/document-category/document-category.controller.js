'use strict';

import _ from 'lodash';
import path from 'path';
import stream from 'stream';
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import async from 'async';
import DocumentCategory from './document-category.model';
import {allDocumentTypes} from '../document-type/document-type.controller';
import * as Auth from '../../auth/auth.service';

grid.mongo = mongoose.mongo;

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

    var gfs = grid(mongoose.connection.db);
    gfs.findOne({_id: category.barcode}, function(err, file) {
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

export function saveDocumentCategoryFile(file, categoryId, logger, callback) {
  var gfs = grid(mongoose.connection.db);

  var writeStream = gfs.createWriteStream({
    filename: file.originalname,
    mimetype: file.mimetype
  });

  var bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  bufferStream.pipe(writeStream);

  writeStream.on('close', function(file) {
    DocumentCategory.findById(categoryId, function(err, category) {
      if (err) { return callback(err); }

      if (category.barcode) {
        // remove existing file, only one allowed
        gfs.remove({_id: category.barcode}, function(err) {
          if (err) return callback(err);

          logger.info('Removed gfs file "' + category.barcode + '" for category "' + category._id + '"', category);
        });
      }

      category
        .set('barcode', file._id)
        .save(function(err, updated) {
          if (err) { return callback(err); }

          return callback(null, file);
        });
    });
  });
}

export function getDocumentCategoryFile(categoryId, callback) {
  DocumentCategory.findById(categoryId, function(err, category) {
    if (err) { return callback(err); }

    if (category.barcode) {
      var gfs = grid(mongoose.connection.db);
      var readstream = gfs.createReadStream({_id: category.barcode});
      callback(null, readstream);
    } else {
      callback();
    }
  });
}

export function updateDocumentCategory(categoryId, label, callback) {
  DocumentCategory.findById(categoryId, function(err, category) {
    if (err) { return callback(err); }

    category
      .set('label', label)
      .save(function(err, updated) {
        if (err) { return callback(err); }

        return callback(null, updated);
      });
  });
}

export function removeDocumentCategory(categoryId, callback) {
  DocumentCategory
    .findById(categoryId)
    .remove()
    .exec(callback);
}

export function updateDocumentCategories(updatedCategories, callback) {
  async.map(updatedCategories, function(positionObj, mapCallback) {
    DocumentCategory
      .findById(positionObj._id)
      .exec(function(err, category) {
        if (err) {
          mapCallback(err);
        }

        category
          .set('position', positionObj.position)
          .save(mapCallback);
      });
  },

  function(err) {
    callback(err);
  });
}

export function updateDocumentType(req, res) {
  if (!req.params.categoryId || !req.body.documentType) {
    return res.status(500).send(); // TODO: status malformed request
  }

  async.parallel({
    old: function(cb) {
      DocumentCategory.findById(req.params.categoryId).exec(cb);
    },

    new: function(cb) {
      DocumentCategory.findById(req.params.newCategoryId).exec(cb);
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

function populateList(list) {
  return new Promise(function(resolve, reject) {
    // "Populate" documents
    var gfs = grid(mongoose.connection.db);

    async.map(list, function(category, mapCallback) {
      if (category.documentTypes && category.documentTypes.length > 0) {
        // Poor man's population
        let fullTypes = [];
        category.documentTypes.forEach(function(documentType) {
          fullTypes.push(_.find(allDocumentTypes, {id: documentType}));
        });

        category.documentTypes = fullTypes;
      }

      populateCategoryBarcode(category).then(mapCallback);
    },

    function() {
      // Sort by position in the tree
      list.sort(comparePosition);
      return resolve(list);
    });
  });
}

export function showDocumentCategoriesLocal(mdph) {
  return function() {
    return DocumentCategory.find({mdph: mdph._id, unclassified: {$ne: true}}).lean().exec().then(populateList);
  };
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
    .then(showDocumentCategoriesLocal(req.mdph))
    .then(respondWithResult(res))
    .catch(handleError(req, res));
}

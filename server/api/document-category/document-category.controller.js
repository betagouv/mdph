'use strict';

import _ from 'lodash';
import path from 'path';
import stream from 'stream';
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
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

function populateCategoryBarcode(category, callback) {
  if (!category.barcode) {
    return callback(null, category);
  }

  var gfs = grid(mongoose.connection.db);
  gfs.findOne({_id: category.barcode}, function(err, file) {
    category.barcode = file;
    callback(null, category);
  });
}

function createSpecialCategory(options, callback) {
  var newCategory = new DocumentCategory(options);

  if (newCategory.unclassified) {
    newCategory.label = 'Documents non catégorisés';
  } else {
    newCategory.label = 'Document de la demande';
  }

  newCategory.save(callback);
}

function getOrCreateSpecialCategory(options, callback) {
  DocumentCategory
    .findOne(options)
    .lean()
    .exec(function(err, category) {
      if (err) callback(err);
      if (!category) {
        createSpecialCategory(options, callback);
      } else {
        populateCategoryBarcode(category, callback);
      }
    });
}

exports.getUnclassifiedCategory = function(mdph, callback) {
  return getOrCreateSpecialCategory({mdph: mdph._id, unclassified: true}, callback);
};

exports.getPdfCategory = function(mdph, callback) {
  return getOrCreateSpecialCategory({mdph: mdph._id, required: true}, callback);
};

exports.saveDocumentCategoryFile = function(file, categoryId, logger, callback) {
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
};

exports.getDocumentCategoryFile = function(categoryId, callback) {
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
};

exports.updateDocumentCategory = function(categoryId, label, callback) {
  DocumentCategory.findById(categoryId, function(err, category) {
    if (err) { return callback(err); }

    category
      .set('label', label)
      .save(function(err, updated) {
        if (err) { return callback(err); }

        return callback(null, updated);
      });
  });
};

exports.removeDocumentCategory = function(categoryId, callback) {
  DocumentCategory
    .findById(categoryId)
    .remove()
    .exec(callback);
};

exports.updateDocumentCategories = function(updatedCategories, callback) {
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
};

exports.updateDocumentType = function(req, res) {
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
};

exports.showUncategorizedDocumentTypes = function(req, res) {
  DocumentCategory
    .find({mdph: req.mdph._id}).lean().exec()
    .then(handleUserNotAuthorized(req, res))
    .then(filterList())
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

exports.createNewDocumentCategory = function(req, res) {
  var newCategory = new DocumentCategory({
    mdph: req.mdph._id,
    position: req.body.position
  });

  newCategory.save()
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

function populateList(res) {
  return function(list) {
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

      populateCategoryBarcode(category, mapCallback);
    },

    function() {
      // Sort by position in the tree
      list.sort(comparePosition);

      return res.json(list);
    });
  };
}

exports.showDocumentCategories = function(req, res) {
  DocumentCategory
    .find({mdph: req.mdph._id, unclassified: {$ne: true}})
    .lean()
    .exec()
    .then(populateList(res))
    .then(respondWithResult(res))
    .catch(handleError(req, res));
};

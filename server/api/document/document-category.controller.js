'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var stream = require('stream');
var DocumentCategory = require('./document-category.model');
var DocumentTypes = require('./documentTypes');

var allDocumentTypes = DocumentTypes.obligatoires.concat(DocumentTypes.complementaires);
grid.mongo = mongoose.mongo;

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

exports.findAndSortCategoriesForMdph = function(mdph, callback) {
  async.waterfall([
    function(waterfallCallback) {
      getOrCreateSpecialCategory({mdph: mdph._id, required: true}, waterfallCallback);
    },

    function(requiredCategory, waterfallCallback) {
      DocumentCategory
        .find({mdph: mdph._id, unclassified: {$ne: true}})
        .lean()
        .exec(waterfallCallback);
    }
  ], function(err, list) {
    if (err) { callback(err); }

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

      return callback(null, list);
    });
  });
};

exports.showUncategorizedDocumentTypes = function(mdph, callback) {
  DocumentCategory
    .find({mdph: mdph._id})
    .lean()
    .exec(function(err, list) {
      if (err) { callback(err); }

      if (!list) { callback({status: 404}); }

      var filteredList = [];
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

      callback(null, filteredList);
    });
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

exports.createNewDocumentCategory = function(mdph, position, callback) {
  var newCategory = new DocumentCategory({
    mdph: mdph._id,
    position: position
  });

  newCategory.save(callback);
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

exports.updateDocumentType = function(documentType, oldCategoryId, newCategoryId, callback) {
  async.parallel({
    old: function(cb) {
      if (!oldCategoryId) {
        cb();
      } else {
        DocumentCategory.findById(oldCategoryId).exec(cb);
      }
    },

    new: function(cb) {
      if (!newCategoryId) {
        cb();
      } else {
        DocumentCategory.findById(newCategoryId).exec(cb);
      }
    }
  },
  function(err, results) {
    if (err) {
      callback(err);
    }

    if (results.old) {
      results.old.update(
        { $pull: { documentTypes: documentType } }
      ).exec();
    }

    if (results.new) {
      results.new.update(
        { $push: { documentTypes: documentType } }
      ).exec();
    }

    callback();
  });
};

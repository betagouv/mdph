'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var stream = require('stream');
var DocumentCategory = require('./document-category.model');

grid.mongo = mongoose.mongo;

function comparePosition(catA, catB) {
  return catA.position - catB.position;
}

exports.findAndSortCategoriesForMdph = function(mdph, callback) {
  DocumentCategory
    .find({mdph: mdph._id})
    .lean()
    .exec(function(err, list) {
      if (err) { callback(err); }

      if (!list) { callback({status: 404}); }

      // "Populate" documents
      var gfs = grid(mongoose.connection.db);

      async.map(list, function(category, mapCallback) {
        if (category.barcode) {
          gfs.findOne({_id: category.barcode}, function(err, file) {
            category.barcode = file;
            mapCallback();
          });
        } else {
          mapCallback();
        }
      },

      function() {
        // Sort by position in the tree
        var categoriesById = _.indexBy(list, '_id');
        var categoriesTree = [];

        _.forEach(list, function(current) {
          if (current.parent) {
            if (categoriesById[current.parent].children) {
              categoriesById[current.parent].children.push(current);
            } else {
              categoriesById[current.parent].children = [current];
            }
          } else {
            categoriesTree.push(current);
          }
        });

        // Sort to display by categories
        categoriesTree.sort(comparePosition);

        _.forEach(categoriesTree, function(current) {
          if (current.children) {
            current.children.sort(comparePosition);
          }
        });

        return callback(null, categoriesTree);
      });
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
      callback(readstream);
    } else {
      callback();
    }
  });
};

exports.createDocumentCategory = function(mdph, position, parent, callback) {
  var newCategory = new DocumentCategory({
    mdph: mdph._id,
    position: position,
    parent: parent
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
    .exec(function(err) {
      if (err) callback(err);

      DocumentCategory
        .find({parent: categoryId})
        .remove()
        .exec(callback);
    });
};

exports.updateDocumentCategories = function(updatedCategories, callback) {
  async.map(updatedCategories, function(positionObj, mapCallback) {
    DocumentCategory
      .findById(positionObj._id)
      .exec(function(err, category) {
        if (err) {
          mapCallback(err);
        }

        if (positionObj.parent) {
          category.set('parent', positionObj.parent);
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

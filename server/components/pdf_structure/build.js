'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var config = require('../../config/environment');

var auth = require('../../auth/auth.service');
var Mdph = require('../../api/mdph/mdph.model');
var DocumentCategoryCtrl = require('../../api/document-category/document-category.controller');

module.exports = function(request, requestTempPdfPath, documentList, callback) {
  Mdph
    .findOne({zipcode: request.mdph})
    .exec(function(err, mdph) {
      if (err) {
        return callback(err);
      }

      async.parallel([
        function(callback) {
          DocumentCategoryCtrl.showDocumentCategoriesLocal(mdph)().then(documentCategories => callback(null, documentCategories));
        },

        function(callback) {
          DocumentCategoryCtrl.getUnclassifiedCategoryLocal(mdph).then(unclassifiedCategory => callback(null, unclassifiedCategory));
        }
      ], function(err, results) {
        if (err) {
          return callback(err);
        }

        // console.log(results);
        const documentCategories = results[0];
        const unclassifiedCategory = results[1];
        const pdfStructure = [];
        const gfs = grid(mongoose.connection.db);

        // Documents sorted by categories
        _.forEach(documentCategories, function(category) {
          let documentFoundForThisCategory = false;

          // Main request document
          if (category.required) {
            if (category.barcode) {
              pdfStructure.push(gfs.createReadStream({_id: category.barcode._id}));
            }

            pdfStructure.push(requestTempPdfPath);
            documentFoundForThisCategory = true;
          }

          _.forEach(category.documentTypes, function(documentType) {
            _.forEach(documentList, function(currentDocument) {
              if (currentDocument.type === documentType.id) {
                if (!documentFoundForThisCategory && category.barcode) {
                  pdfStructure.push(gfs.createReadStream({_id: category.barcode._id}));
                  documentFoundForThisCategory = true;
                }

                pdfStructure.push(currentDocument.path);
                currentDocument.___classified = true;
              }
            });
          });
        });

        // Other documents
        var unclassifiedDocuments = _.filter(documentList, function(document) {
          return !document.___classified;
        });

        if (unclassifiedCategory.barcode && unclassifiedDocuments.length > 0) {
          pdfStructure.push(gfs.createReadStream({_id: unclassifiedCategory.barcode._id}));
        }

        _.forEach(unclassifiedDocuments, function(currentDocument) {
          pdfStructure.push(currentDocument.path);
        });

        callback(null, pdfStructure);
      });
    });
};

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
var DocumentCategoryCtrl = require('../../api/document/document-category.controller');

module.exports = function(request, user, requestTempPdfPath, documentList, callback) {
  if (auth.hasRole(user, 'adminMdph')) {
    buildGroupStructure(request, requestTempPdfPath, documentList, callback);
  } else {
    buildFlatStructure(requestTempPdfPath, documentList, callback);
  }
};

function buildGroupStructure(request, requestTempPdfPath, documentList, callback) {
  Mdph
    .findOne({zipcode: request.mdph})
    .exec(function(err, mdph) {
      if (err) {
        return callback(err);
      }

      async.parallel([
        function(callback) {
          DocumentCategoryCtrl.getPdfCategory(mdph, callback);
        },

        function(callback) {
          DocumentCategoryCtrl.getUnclassifiedCategory(mdph, callback);
        },

        function(callback) {
          DocumentCategoryCtrl.findAndSortCategoriesForMdph(mdph, callback);
        }
      ], function(err, results) {
        if (err) {
          return callback(err);
        }

        // console.log(results);
        const pdfCategory = results[0];
        const unclassifiedCategory = results[1];
        const documentCategories = results[2];
        const pdfStructure = [];
        const gfs = grid(mongoose.connection.db);

        // Main request document
        if (pdfCategory.barcode) {
          pdfStructure.push(gfs.createReadStream({_id: pdfCategory.barcode._id}));
        }

        pdfStructure.push(requestTempPdfPath);

        // Documents sorted by categories
        _.forEach(documentCategories, function(category) {
          pdfStructure.push(gfs.createReadStream({_id: category.barcode._id}));

          _.forEach(category.documentTypes, function(documentType) {
            _.forEach(documentList, function(currentDocument) {
              if (currentDocument.type === documentType.id) {
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

        if (unclassifiedCategory.barcode) {
          pdfStructure.push(gfs.createReadStream({_id: unclassifiedCategory.barcode._id}));
        }

        _.forEach(unclassifiedDocuments, function(currentDocument) {
          pdfStructure.push(currentDocument.path);
        });

        callback(null, pdfStructure);
      });
    });
}

function buildFlatStructure(requestTempPdfPath, documentList, callback) {
  var pdfStructure = [
    requestTempPdfPath
  ];

  if (documentList.length > 0) {
    documentList.forEach(function(currentDocument) {
      pdfStructure.push(currentDocument.path);
    });
  }

  callback(null, pdfStructure);
}

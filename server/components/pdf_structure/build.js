'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var fs = require('fs');
var config = require('../../config/environment');

var gridfs = require('../gridfs');
var auth = require('../../auth/auth.service');
var Mdph = require('../../api/mdph/mdph.model');
var DocumentCategoryCtrl = require('../../api/document-category/document-category.controller');

import Promise from 'bluebird';

module.exports = function(request, requestTempPdfPath, documentList) {
  return Promise.using(
    Mdph.findOne({zipcode: request.mdph}).exec(),

    (mdph) => {
      return Promise.using(
        DocumentCategoryCtrl.showDocumentCategoriesPromise(mdph),
        DocumentCategoryCtrl.getUnclassifiedCategoryLocal(mdph),

        (documentCategories, unclassifiedCategory) => {
          const pdfStructure = [];
          const gfs = gridfs();

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
          });

          return pdfStructure;
        });
    });
};

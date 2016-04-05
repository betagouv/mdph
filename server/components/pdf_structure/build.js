'use strict';

import _ from 'lodash';
import path from 'path';
import async from 'async';
import fs from 'fs';
import config from '../../config/environment';

import gridfs from '../gridfs';
import auth from '../../auth/auth.service';
import Mdph from '../../api/mdph/mdph.model';
import * as DocumentCategoryCtrl from '../../api/document-category/document-category.controller';

import Promise from 'bluebird';

module.exports = function(zipcode, requestTempPdfPath, documentList) {
  return Promise.using(
    Mdph.findOne({zipcode: zipcode}).exec(),

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
              pdfStructure.unshift(requestTempPdfPath);
              if (category.barcode) {
                pdfStructure.unshift(gfs.createReadStream({_id: category.barcode._id}));
              }

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

          return pdfStructure;
        });
    });
};

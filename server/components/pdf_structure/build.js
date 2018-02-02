'use strict';

import _ from 'lodash';

import gridfs from '../gridfs';
import Mdph from '../../api/mdph/mdph.model';
import * as DocumentCategoryCtrl from '../../api/document-category/document-category.controller';

import Promise from 'bluebird';

module.exports = function(zipcode, requestTempPdfPath, documentList, withSeparator) {
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
              pdfStructure.unshift({name: 'Demande.pdf', path: requestTempPdfPath});
              if (category.barcode && withSeparator) {
                pdfStructure.unshift({name: 'separateur_demande.pdf', path: gfs.createReadStream({_id: category.barcode._id})});
              }

              documentFoundForThisCategory = true;
            }

            _.forEach(category.documentTypes, function(documentType) {
              var index = 0;
              _.forEach(documentList, function(currentDocument) {
                if (currentDocument.type === documentType.id) {
                  index += 1;
                  if (!documentFoundForThisCategory && category.barcode && withSeparator) {
                    pdfStructure.push({name: `separateur_${documentType.id}.pdf`, path: gfs.createReadStream({_id: category.barcode._id})});
                    documentFoundForThisCategory = true;
                  }

                  pdfStructure.push({name: `${documentType.label}_${index}.pdf`, path:currentDocument.path});
                  currentDocument.___classified = true;
                }
              });
            });
          });

          // Other documents
          var unclassifiedDocuments = _.filter(documentList, function(document) {
            return !document.___classified;
          });

          if (unclassifiedCategory.barcode && withSeparator && unclassifiedDocuments.length > 0) {
            pdfStructure.push({name: 'separateur_autre.pdf', path: gfs.createReadStream({_id: unclassifiedCategory.barcode._id})});
          }

          var index = 0;
          _.forEach(unclassifiedDocuments, function(currentDocument) {
            index += 1;
            pdfStructure.push({name: `Non-classifié_${index}.pdf`, path: currentDocument.path});
          });

          return pdfStructure;
        });
    });
};

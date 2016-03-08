'use strict';

var _ = require('lodash');
var path = require('path');
var DocumentTypes = require('./documentTypes');

var allDocumentTypes = DocumentTypes.obligatoires.concat(DocumentTypes.complementaires);
var allDocumentTypesById = _.indexBy(allDocumentTypes, 'id');

function addToDocumentGroups(documentGroups, document, documentType) {
  if (documentGroups[document.type]) {
    documentGroups[document.type].documentList.push(document);
  } else {
    documentGroups[document.type] = {
      documentType: documentType,
      documentList: [document]
    };
  }
}

export default {
  allDocumentTypes: allDocumentTypes,
  allDocumentTypesById: allDocumentTypesById,

  populateAndSortDocumentTypes: function(request) {
    if (request.documents && request.documents.length >= 0) {
      var groupedDocuments = _.reduce(request.documents, function(result, currentDocument) {
        var documentType = allDocumentTypesById[currentDocument.type];
        if (!documentType) {
          documentType = allDocumentTypesById.autre;
        }

        if (documentType.mandatory) {
          addToDocumentGroups(result.obligatoires, currentDocument, documentType);
        } else {
          addToDocumentGroups(result.complementaires, currentDocument, documentType);
        }

        return result;
      }, {obligatoires: {}, complementaires: {}});

      request.documents = groupedDocuments;
    }

    return request;
  },

  show: function(req, res) {
    const documentType = _.find(allDocumentTypes, {id: req.params.id});
    console.log(req.query.type);

    if (!documentType) {
      return res.sendStatus(404);
    } else {
      return res.json(documentType);
    }
  },

  index: function(req, res) {
    console.log(req.query.type);
    const type = req.query.type;

    if (type) {
      return res.json(DocumentTypes[type]);
    } else {
      return res.json(allDocumentTypes);
    }
  }
};

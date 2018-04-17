'use strict';

import _ from 'lodash';
import DocumentTypes from './documentTypes.json';

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

export var allDocumentTypes = DocumentTypes.obligatoires.concat(DocumentTypes.complementaires);

export var allDocumentTypesById = _.indexBy(allDocumentTypes, 'id');

export function populateAndSortDocumentTypes(request) {
  if (request.data && request.data.documents && request.data.documents.length >= 0) {
    var groupedDocuments = _.reduce(request.data.documents, function(result, currentDocument) {
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

    request.data.documents = groupedDocuments;
  } else {
    request.data.documents = {obligatoires: {}, complementaires: {}};
  }

  return request;
}

export function show(req, res) {
  const documentType = _.find(allDocumentTypes, {id: req.params.id});

  if (!documentType) {
    return res.sendStatus(404);
  } else {
    return res.json(documentType);
  }
}

export function index(req, res) {
  const type = req.query.type;

  if (type) {
    return res.json(DocumentTypes[type]);
  } else {
    return res.json(allDocumentTypes);
  }
}

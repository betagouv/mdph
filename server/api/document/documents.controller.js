'use strict';

var _ = require('lodash');
var path = require('path');
var DocumentTypes = require('./documentTypes');

var allDocumentTypes = DocumentTypes.obligatoires.concat(DocumentTypes.complementaires);

// Get list of DocumentTypes
exports.index = function(req, res) {
  const type = req.query.type;

  if (type) {
    return res.json(DocumentTypes[type]);
  } else {
    return res.json(allDocumentTypes);
  }
};

exports.show = function(req, res) {
  const documentType = _.find(allDocumentTypes, {id: req.params.id});

  if (!documentType) {
    return res.sendStatus(404);
  } else {
    return res.json(documentType);
  }
};

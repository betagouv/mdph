'use strict';

var _ = require('lodash');
var path = require('path');
var config = require('../../config/environment');
var groupDocumentList = require('./groupDocumentList');

module.exports = function(request, user, requestTempPdfPath, documentList) {
  if (request.mdph === '59' && user.role === 'adminMdph') {
    return buildGroupStructure(requestTempPdfPath, documentList);
  } else {
    return buildFlatStructure(requestTempPdfPath, documentList);
  }
};

function getSeparatorPath(separator) {
  return path.join(config.root, '/server/components/pdf_templates/', separator);
}

function buildGroupStructure(requestTempPdfPath, documentList) {
  var pdfStructure = [
    getSeparatorPath('sep_cerfa.pdf'),
    requestTempPdfPath
  ];

  var groups = groupDocumentList(documentList);

  groups.forEach(function(group) {
    if (group.documentList.length > 0) {
      var separator = getSeparatorPath(group.separator);
      pdfStructure.push(separator);
      group.documentList.forEach(function(document) {
        pdfStructure.push(document.path);
      });
    }
  });

  return pdfStructure;
}

function buildFlatStructure(requestTempPdfPath, documentList) {
  var pdfStructure = [
    requestTempPdfPath
  ];

  if (documentList.length > 0) {
    documentList.forEach(function(document) {
      pdfStructure.push(document.path);
    });
  }
}

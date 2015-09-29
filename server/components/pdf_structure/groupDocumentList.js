'use strict';

var _ = require('lodash');

module.exports = function(documentList) {
  var groupsFor59 = [
    {
      separator: 'sep_justificatifs.pdf',
      category: 'justificatifs',
      documentList: []
    },
    {
      separator: 'sep_certificat.pdf',
      category: 'certificat',
      documentList: []
    },
    {
      separator: 'sep_autres_bilans_medicaux.pdf',
      category: 'autres_bilans_medicaux',
      documentList: []
    },
    {
      separator: 'sep_scolarite.pdf',
      category: 'scolarite',
      documentList: []
    },
    {
      separator: 'sep_vie_pro.pdf',
      category: 'vie_pro',
      documentList: []
    },
    {
      separator: 'sep_bilan_ems_sms.pdf',
      category: 'bilan_ems_sms',
      documentList: []
    },
    {
      separator: 'sep_autres.pdf',
      category: 'autres',
      documentList: []
    }
  ];

  var groupsFor59ByIdx = _.indexBy(groupsFor59, 'category');

  documentList.forEach(function(document) {
    if (groupsFor59ByIdx[document.category]) {
      groupsFor59ByIdx[document.category].documentList.push(document);
    } else {
      groupsFor59ByIdx.autres.documentList.push(document);
    }
  });

  return groupsFor59;
};

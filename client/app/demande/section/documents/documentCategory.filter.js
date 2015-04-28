'use strict';

angular.module('impactApp')
  .filter('documentCategory', function () {
    return function (category) {
      if (!category) {
        return 'Autre';
      }
      var document = category[0];
      switch (document.category) {
        case 'certificat':
          return 'Certificat Médical';
        case 'justificatifs':
          return 'Justificatifs';
        case 'autres_bilans_medicaux':
          return 'Bilans médicaux';
        case 'scolarite':
          return 'Scolarité';
        case 'bilan_ems_sms':
          return 'Synthèses Etablissements et services';
        case 'vie_pro':
          return 'Vie professionnelle';
        case 'autre':
          return 'Autre document';
        default:
          return category;
      }
    };
  });

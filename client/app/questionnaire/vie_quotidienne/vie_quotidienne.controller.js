'use strict';

angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        sref: '.situation.vie_famille',
        include: 'departement.questionnaire.vie_quotidienne.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: '.vos_besoins.quotidien',
        include: 'departement.questionnaire.vie_quotidienne.vos_besoins.**',
        label: 'Vos besoins',
        labelRep: 'Ses besoins',
        showBefore: true,
        showAfter: true
      },
      {
        sref: '.vos_attentes.type_aide',
        include: 'departement.questionnaire.vie_quotidienne.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-4';

    $scope.sectionModel = sectionModel;
  });

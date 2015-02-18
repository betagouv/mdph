'use strict';

angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        sref: 'departement.questionnaire.aidant.situation.lien',
        include: 'departement.questionnaire.aidant.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: 'departement.questionnaire.aidant.vos_attentes.type_attente',
        include: 'departement.questionnaire.aidant.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];

    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

'use strict';

angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        include: 'departement.questionnaire.vie_quotidienne.situation.**',
        label: 'Votre situation',
        showAfter: true
      },
      {
        include: 'departement.questionnaire.vie_quotidienne.vos_besoins.**',
        label: 'Vos besoins',
        showBefore: true,
        showAfter: true
      },
      {
        include: 'departement.questionnaire.vie_quotidienne.vos_attentes.**',
        label: 'Vos attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-4';

    $scope.sectionModel = sectionModel;
  });

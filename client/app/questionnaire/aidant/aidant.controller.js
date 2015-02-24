'use strict';

angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        include: 'departement.questionnaire.aidant.situation.**',
        label: 'Votre situation',
        showAfter: true
      },
      {
        include: 'departement.questionnaire.aidant.vos_attentes.**',
        label: 'Vos attentes',
        showBefore: true
      }
    ];

    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

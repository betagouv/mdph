'use strict';

angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        include: 'departement.questionnaire.vie_scolaire.situation.**',
        label: 'Votre situation',
        showAfter: true
      },
      {
        include: 'departement.questionnaire.vie_scolaire.vos_attentes.**',
        label: 'Vos attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

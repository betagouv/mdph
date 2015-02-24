'use strict';

angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        include: 'departement.questionnaire.vie_au_travail.situation_professionnelle.**',
        label: 'Votre situation professionnelle',
        showAfter: true
      },
      {
        include: 'departement.questionnaire.vie_au_travail.projet_professionnel.**',
        label: 'Votre projet professionnel',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

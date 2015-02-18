'use strict';

angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        sref: 'departement.questionnaire.vie_au_travail.situation_professionnelle.condition',
        include: 'departement.questionnaire.vie_au_travail.situation_professionnelle.**',
        label: 'Votre situation professionnelle',
        labelRep: 'Sa situation professionnelle',
        showAfter: true
      },
      {
        sref: 'departement.questionnaire.vie_au_travail.projet_professionnel.description',
        include: 'departement.questionnaire.vie_au_travail.projet_professionnel.**',
        label: 'Votre projet professionnel',
        labelRep: 'Ses projet professionnel',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

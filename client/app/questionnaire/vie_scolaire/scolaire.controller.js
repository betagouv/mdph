'use strict';

angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, sectionModel) {
    $scope.subsections = [
      {
        sref: '.situation.condition',
        include: 'departement.questionnaire.vie_scolaire.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: '.vos_attentes.structure',
        include: 'departement.questionnaire.vie_scolaire.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    $scope.sectionModel = sectionModel;
  });

'use strict';

angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, $sessionStorage, FormService) {

    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Sa scolarité' : 'Votre scolarité';

    $scope.subsections = [
      {
        sref: '.situation.condition',
        include: 'departement.questionnaire.projet_de_vie.scolarite.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: '.vos_attentes.structure',
        include: 'departement.questionnaire.projet_de_vie.scolarite.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    if (angular.isUndefined($scope.formAnswers.scolaire)) {
      $scope.formAnswers.scolaire = {};
    }

    $scope.sectionModel = $scope.formAnswers.scolaire;
  });

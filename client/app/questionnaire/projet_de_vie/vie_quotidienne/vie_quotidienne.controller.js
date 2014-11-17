'use strict';

angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, FormService) {

    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Sa vie quotidienne' : 'Votre vie quotidienne';

    $scope.subsections = [
      {
        sref: '.situation.vie_famille',
        include: 'questionnaire.projet_de_vie.vie_quotidienne.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: '.vos_besoins.quotidien',
        include: 'questionnaire.projet_de_vie.vie_quotidienne.vos_besoins.**',
        label: 'Vos besoins',
        labelRep: 'Ses besoins',
        showBefore: true,
        showAfter: true
      },
      {
        sref: '.vos_attentes.type_aide',
        include: 'questionnaire.projet_de_vie.vie_quotidienne.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-4';

    if (angular.isUndefined($scope.formAnswers.vieQuotidienne)) {
      $scope.formAnswers.vieQuotidienne = {};
    }

    $scope.sectionModel = $scope.formAnswers.vieQuotidienne;
  });

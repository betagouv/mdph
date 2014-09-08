'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinSoutienCtrl
 * @description
 * # BesoinSoutienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinSoutienCtrl', function ($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Pour quoi a-t-' + FormService.getPronoun($scope.formAnswers) + ' besoin de soutien ?' : 'Pour quoi avez-vous besoin de soutien ?';

    if (angular.isUndefined($scope.sectionModel.besoinSoutien)) {
      $scope.sectionModel.besoinSoutien = {
        soutiens: {
          'bilan': false,
          'precisions': false,
          'environnement': false,
          'emploi': false,
          'formation': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.besoinSoutien;
    $scope.question = {
      model: 'soutiens',
      answers:
      [
        {'label': 'Faire un bilan de capacités professionnelles', model: 'bilan'},
        {'label': 'Préciser un projet professionnel', model: 'precisions'},
        {'label': 'Adapter l\'environnement de travail', model: 'environnement'},
        {'label': 'Accéder à un emploi', model: 'emploi'},
        {'label': 'Accéder à une formation', model: 'formation'},

        {'label': 'Autre besoin', model: 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });

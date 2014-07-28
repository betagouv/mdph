'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinSoutienCtrl
 * @description
 * # BesoinSoutienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinSoutienCtrl', function ($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Pour quoi a-t-' + $scope.getPronoun() + ' besoin de soutien ?' : 'Pour quoi avez-vous besoin de soutien ?';

    if (angular.isUndefined($scope.subSectionModel.besoinSoutien)) {
      $scope.subSectionModel.besoinSoutien = {
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

    $scope.model = $scope.subSectionModel.besoinSoutien;
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

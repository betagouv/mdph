'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RenouvellementCtrl
 * @description
 * # RenouvellementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state) {
    $scope.title = 'Votre renouvellement';

    $scope.question = {
      'model': 'changementDeSituation',
      'answers': [
        {'label': 'Vous arrivez à la fin de vos droits', 'value': false},
        {'label': 'Votre situation a changé', 'value': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('form.demande.representant');
    };
  });

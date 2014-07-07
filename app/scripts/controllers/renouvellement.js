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
        $scope.question = {
      'title': 'Votre renouvellement',
      'answers': [
        {'label': 'Vous arrivez à la fin de vos droits', 'value': false},
        {'label': 'Votre situation a changé', 'value': true}
      ]
    };

    $scope.isNextStepDisabled = function() {
      return $scope.question.model === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.changementDeSituation = $scope.question.model;
      $state.go('q.representant');
    };
  });

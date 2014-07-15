'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionTravailCtrl
 * @description
 * # ConditionTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionTravailCtrl', function($scope, $state) {
    
    $scope.question = {
      'model': 'condition',
      'answers': [
        {'label': 'Vous avez un emploi', 'value': true},
        {'label': 'Vous êtes actuellement sans emploi', 'value': false}
      ]
    };

    $scope.nextStep = function() {
      $state.go('form.envoi');
    };
  });
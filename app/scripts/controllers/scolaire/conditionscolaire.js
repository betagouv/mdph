'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionScolaireCtrl
 * @description
 * # ConditionScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionScolaireCtrl', function($scope, $state) {

    $scope.question = {
      'model': 'condition',
      'answers': [
        {'label': 'Vous êtes actuellement scolarisé', 'value': true},
        {'label': 'Vous n\'êtes pas scolarisé', 'value': false}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.^.travail.condition');
    };
  });
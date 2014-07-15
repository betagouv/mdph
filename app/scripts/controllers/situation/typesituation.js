'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeSituationCtrl
 * @description
 * # TypeSituationCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeSituationCtrl', function($scope, $state) {
    
    if (angular.isUndefined($scope.parentModel.type)) {
      $scope.parentModel.type = {
        emploi: false,
        scolaire: false
      };
    }

    $scope.model = $scope.parentModel.type;

    $scope.nextStep = function() {
      $state.go('form.envoi');
    };
  });
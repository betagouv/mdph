'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionsCtrl
 * @description
 * # ConditionsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionsCtrl', function($scope, $sessionStorage, $state) {

    if (angular.isDefined($sessionStorage.acceptConditions)) {
      $scope.acceptConditions = $sessionStorage.acceptConditions;
    }

    $scope.isNextStepDisabled = function() {
      return !$scope.acceptConditions;
    };

    $scope.nextStep = function() {
      $sessionStorage.acceptConditions = true;
      $state.go('form.contexte.pour_commencer.representant');
    };
  });

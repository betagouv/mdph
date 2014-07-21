'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiHeuresCtrl
 * @description
 * # EmploiHeuresCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiHeuresCtrl', function($scope, $state) {

    if (angular.isUndefined($scope.subSectionModel.heures)) {
      $scope.subSectionModel.heures = {
        label: 'Heures/semaines',
        value: ''
      };
    }

    $scope.model = $scope.subSectionModel.heures;

    $scope.isNextStepDisabled = function() {
      return $scope.subSectionModel.heures.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });

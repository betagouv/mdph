'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementGlobalCtrl
 * @description
 * # LogementGlobalCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementGlobalCtrl', function($scope, $state) {
    $scope.data.vieDetail = '';
    $scope.isNextStepEnabled = function() {
      return $scope.data.vie !== undefined && ($scope.data.vie !== 'autre' || $scope.data.vieDetail !== '');
    };

    $scope.nextStep = function() {
      $state.go('q.vie_quotidienne.logement_detail');
    };
  });

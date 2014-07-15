'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($rootScope, $scope, $state, $stateParams, $sessionStorage, isAdult) {
    $scope.dev = true;
  	$scope.acceptConditions = false;

    // TODO remplacer toute cette partie par ui-serf-active quand
    // ca marchera pour les nested states
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.initData = function() {
      $sessionStorage.data = { 'mdph' : 'calvados'};
    };

    $scope.isAdult = function() {
      return isAdult($scope.data.dateNaissance);
    };

    $scope.processForm = function() {
      console.log($scope.data);
    };

    if (angular.isUndefined($sessionStorage.data)) {
      $scope.initData();
    }

    $scope.data = $sessionStorage.data;
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $sessionStorage, isAdult) {
    $scope.dev = true;
  	$scope.acceptConditions = false;

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

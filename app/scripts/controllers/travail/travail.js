'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TravailCtrl
 * @description
 * # TravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TravailCtrl', function ($scope) {
    $scope.title = 'Votre travail';

    if (angular.isUndefined($scope.data.travail)) {
      $scope.data.travail = {};
    }

    $scope.model = $scope.data.travail;
  });

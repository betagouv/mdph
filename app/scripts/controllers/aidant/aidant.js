'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantCtrl
 * @description
 * # AidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantCtrl', function ($scope) {
    $scope.title = 'Situation et besoins de l\'aidant familial';

    if (angular.isUndefined($scope.data.aidant)) {
      $scope.data.aidant = {};
    }

    $scope.model = $scope.data.aidant;
  });

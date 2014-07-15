'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationCtrl
 * @description
 * # SituationCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationCtrl', function ($scope) {
    $scope.title = 'Votre situation';

    if (angular.isUndefined($scope.data.situation)) {
      $scope.data.situation = {};
    }

    $scope.parentModel = $scope.data.situation;
  });

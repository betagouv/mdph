'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VosAttentesCtrl
 * @description
 * # VosAttentesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VosAttentesCtrl', function ($scope) {
    $scope.title = 'Vos attentes pour compenser votre handicap';

    if (angular.isUndefined($scope.data.attentes)) {
      $scope.data.attentes = {};
    }

    $scope.parentModel = $scope.data.attentes;
  });

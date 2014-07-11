'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieQuotidienneCtrl
 * @description
 * # VieQuotidienneCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope) {
    $scope.title = 'Votre vie quotidienne';

    if (angular.isUndefined($scope.data.vie)) {
      $scope.data.vie = {};
    }

    $scope.parentModel = $scope.data.vie;
  });

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
    $scope.title = 'Votre aidant';

    $scope.section = 'votre_aidant';

    if (angular.isUndefined($scope.data.aidant)) {
      $scope.data.aidant = {};
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };
    
    $scope.model = $scope.data.aidant;
  });

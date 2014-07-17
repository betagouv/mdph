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
    $scope.title = 'Votre scolarité';

    $scope.section = 'votre_scolarite';

    if (angular.isUndefined($scope.data.aidant)) {
      $scope.data.aidant = {};
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };
    
    $scope.model = $scope.data.aidant;
  });

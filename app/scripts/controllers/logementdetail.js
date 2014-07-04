'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementDetailCtrl
 * @description
 * # LogementDetailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementDetailCtrl', function($scope, $state) {
    $scope.data.logementDetail = '';
    $scope.data.etablissementNom = '';
    $scope.data.hebergementDetail = '';
    $scope.data.independantDetail = '';

    $scope.isNextStepEnabled = function() {
      switch ($scope.data.logement) {
        case 'autre':
          return $scope.data.logementDetail !== '';
        case 'etablissement':
          return $scope.data.etablissementNom !== '';
        case 'hebergement':
          return $scope.data.hebergementDetail !== '';
        case 'independant':
          return $scope.data.independantDetail !== '';
        default:
          return false;
      }
    };

    $scope.nextStep = function() {
      $state.go('q.vie_quotidienne.hebergement');
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsCtrl
 * @description
 * # AutresRenseignementsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsCtrl', function ($scope, $state) {
    $scope.nextStep = function() {
      if ($scope.textData) {
        $scope.data.autresRenseignements = $scope.textData;
      }
      $state.go('^.^.scolaire.condition');
    };
  });

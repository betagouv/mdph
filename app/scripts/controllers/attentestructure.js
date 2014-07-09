'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AttenteStructureCtrl
 * @description
 * # AttenteStructureCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AttenteStructureCtrl', function ($scope, $state) {
    $scope.isNextStepDisabled = function() {
      return $scope.structure === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.attente.structure = $scope.structure;
      $state.go('form.autres_renseignements');
    };
  });

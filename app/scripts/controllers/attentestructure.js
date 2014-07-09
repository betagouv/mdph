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
    $scope.structures = [];

    $scope.addStructure = function() {
      $scope.structures.push(
        {'name': '', 'contact': false}
      );
    };
    $scope.addStructure();

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.structureYesNo);
    };

    $scope.nextStep = function() {
      if ($scope.structureYesNo) {
        $scope.data.structures = $scope.structures;
      }
      $state.go('form.autres_renseignements');
    };
  });

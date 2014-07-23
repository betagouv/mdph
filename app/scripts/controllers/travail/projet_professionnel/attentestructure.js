'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AttenteStructureProjetProCtrl
 * @description
 * # AttenteStructureProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AttenteStructureProjetProCtrl', function ($scope, $state) {

    if (angular.isUndefined($scope.subSectionModel.structure)) {
      $scope.subSectionModel.structure = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }

    $scope.model = $scope.subSectionModel.structure;
    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });

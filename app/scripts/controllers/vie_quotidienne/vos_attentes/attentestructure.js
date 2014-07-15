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

    if (angular.isUndefined($scope.parentModel.structure)) {
      $scope.parentModel.structure = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }

    $scope.model = $scope.parentModel.structure;
    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };

    $scope.nextStep = function() {
      $state.go('form.vie_quotidienne.autres_renseignements');
    };
  });

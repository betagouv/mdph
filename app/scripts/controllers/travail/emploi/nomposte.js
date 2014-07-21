'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NomPosteCtrl
 * @description
 * # NomPosteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NomPosteCtrl', function($scope, $state) {

    if (angular.isUndefined($scope.subSectionModel.nomPoste)) {
      $scope.subSectionModel.nomPoste = {
        label: 'Nom du poste',
        value: ''
      };
    }

    $scope.model = $scope.subSectionModel.nomPoste;

    $scope.isNextStepDisabled = function() {
      return $scope.model.value === '';
    };
    
    $scope.nextStep = function() {
      $state.go('^.temps');
    };
  });

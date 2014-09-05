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

    $scope.subtitle = 'Quel est le nom du poste ?';

    if (angular.isUndefined($scope.sectionModel.nomPoste)) {
      $scope.sectionModel.nomPoste = {
        placeholder: 'Nom du poste',
        value: ''
      };
    }

    $scope.model = $scope.sectionModel.nomPoste;

    $scope.isNextStepDisabled = function() {
      return $scope.model.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.temps');
    };
  });

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

    $scope.subtitle = $scope.estRepresentant() ? 'Quel est l\'intitulé de son poste ?' : 'Quel est l\'intitulé du poste ?';

    if (angular.isUndefined($scope.subSectionModel.nomPoste)) {
      $scope.subSectionModel.nomPoste = {
        placeholder: 'Nom du poste',
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

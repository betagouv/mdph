'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmployeurCtrl
 * @description
 * # EmployeurCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmployeurCtrl', function($scope, $state) {
    $scope.subtitle = $scope.estRepresentant() ? 'Son employeur' : 'Votre employeur';

    if (angular.isUndefined($scope.subSectionModel.employeur)) {
      $scope.subSectionModel.employeur = {
        nom: {label: 'Nom', value: ''},
        adresse: {label: 'Adresse', value: ''},
        medecin: {label: 'Service/Médecin', value: ''}
      };
    }

    $scope.model = $scope.subSectionModel.employeur;

    $scope.isNextStepDisabled = function() {
      return $scope.model.nom.value === '' || $scope.model.adresse.value === '';
    };
    
    $scope.nextStep = function() {
      $state.go('^.emploi.nom_poste');
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiHeuresCtrl
 * @description
 * # EmploiHeuresCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiHeuresCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ? 'Quellle est sa durée de travail par semaine ?' : 'Quellle est votre durée de travail par semaine ?';

    if (angular.isUndefined($scope.subSectionModel.heures)) {
      $scope.subSectionModel.heures = {
        label: 'Durée de travail',
        value: '',
        addon: 'Heures / semaine'
      };
    }

    $scope.model = $scope.subSectionModel.heures;

    $scope.isNextStepDisabled = function() {
      return $scope.subSectionModel.heures.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });

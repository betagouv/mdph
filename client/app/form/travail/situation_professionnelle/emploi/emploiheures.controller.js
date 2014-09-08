'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiHeuresCtrl
 * @description
 * # EmploiHeuresCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiHeuresCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Quellle est sa durée de travail par semaine ?' : 'Quellle est votre durée de travail par semaine ?';

    if (angular.isUndefined($scope.sectionModel.heures)) {
      $scope.sectionModel.heures = {
        label: 'Durée de travail',
        value: '',
        addon: 'Heures / semaine'
      };
    }

    $scope.model = $scope.sectionModel.heures;

    $scope.isNextStepDisabled = function() {
      return $scope.sectionModel.heures.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });

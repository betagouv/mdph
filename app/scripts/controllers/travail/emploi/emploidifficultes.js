'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiDifficultesCtrl
 * @description
 * # EmploiDifficultesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiDifficultesCtrl', function($scope, $state) {

    if (angular.isUndefined($scope.subSectionModel.difficultes)) {
      $scope.subSectionModel.difficultes = {
        label: 'Quelles sont les difficultées liées à votre handicap ?',
        labelRep: 'Quelles sont les difficultées liées à son handicap ?',
        value: '',
        rows: 4
      };
    }

    $scope.model = $scope.subSectionModel.difficultes;

    $scope.isNextStepDisabled = function() {
      return $scope.subSectionModel.difficultes.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.amenagement');
    };
  });

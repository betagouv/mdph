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

    $scope.subtitle = $scope.estRepresentant() ?
      'Quelles sont les difficultées liées à son handicap ?' : 'Quelles sont les difficultées liées à votre handicap ?';

    if (angular.isUndefined($scope.sectionModel.difficultes)) {
      $scope.sectionModel.difficultes = {
        value: '',
        rows: 4
      };
    }

    $scope.model = $scope.sectionModel.difficultes;

    $scope.isNextStepDisabled = function() {
      return $scope.sectionModel.difficultes.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.amenagement');
    };
  });

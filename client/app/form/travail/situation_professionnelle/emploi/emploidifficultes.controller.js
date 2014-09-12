'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiDifficultesCtrl
 * @description
 * # EmploiDifficultesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiDifficultesCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'difficultes', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.difficultes)) {
      $scope.sectionModel.difficultes = {
        value: '',
        rows: 4
      };
    }

    $scope.model = $scope.sectionModel.difficultes;

    $scope.nextStep = function() {
      $state.go('^.amenagement');
    };
  });

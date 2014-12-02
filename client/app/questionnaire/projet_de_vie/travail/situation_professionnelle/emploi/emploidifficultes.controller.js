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
    $scope.rows = 4;

    $scope.nextStep = function() {
      $state.go('^.amenagement');
    };
  });

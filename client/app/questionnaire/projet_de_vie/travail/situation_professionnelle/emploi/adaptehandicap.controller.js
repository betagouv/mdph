'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AdapteHandicapCtrl
 * @description
 * # AdapteHandicapCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AdapteHandicapCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'adapte', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.difficultes');
    };
  });

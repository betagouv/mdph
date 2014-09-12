'use strict';

angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('raison', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });

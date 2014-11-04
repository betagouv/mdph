'use strict';

angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'raison', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.nextStep = function() {
      var answer = $scope.sectionModel[$scope.question.model];
      if (answer) {
        $state.go('^.taux');
      } else {
        $state.go('^.liste_droits');
      }
    };
  });

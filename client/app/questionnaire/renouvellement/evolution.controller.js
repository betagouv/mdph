'use strict';

angular.module('impactApp')
  .controller('EvolutionCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('renouvellement', 'evolution', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.nextStep = function() {
      $state.go('^.liste_droits');
    };
  });

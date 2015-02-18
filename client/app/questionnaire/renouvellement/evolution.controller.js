'use strict';

angular.module('impactApp')
  .controller('EvolutionCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('renouvellement', 'evolution', $scope.formAnswers);
    $scope.hideBack = true;

    $scope.nextStep = function() {
      $state.go('^.liste_droits');
    };
  });

'use strict';

angular.module('impactApp')
  .controller('UrgencesCtrl', function($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('contexte', 'urgences', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.currentRequest.renouvellement) {
        $state.go('^.^.renouvellement.evolution');
      } else {
        $state.go('^.^.vie_quotidienne.situation.vie_famille');
      }
    };
  });

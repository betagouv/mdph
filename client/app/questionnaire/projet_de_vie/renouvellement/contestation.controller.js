'use strict';

angular.module('impactApp')
  .controller('ContestationTauxCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'contestationTaux', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.^.vie_quotidienne.situation.vie_famille');
    };
  });

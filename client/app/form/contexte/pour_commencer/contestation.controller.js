'use strict';

angular.module('impactApp')
  .controller('ContestationTauxCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'contestationTaux', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });

'use strict';

angular.module('impactApp')
  .controller('TauxCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'connaisTaux', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.contestationTaux');
    };
  });

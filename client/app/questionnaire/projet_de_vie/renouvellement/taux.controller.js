'use strict';

angular.module('impactApp')
  .controller('TauxCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'connaisTaux', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model]) {
        $state.go('^.contestationTaux');
      } else {
        $state.go('^.^.vie_quotidienne.situation.vie_famille');
      }
    };
  });

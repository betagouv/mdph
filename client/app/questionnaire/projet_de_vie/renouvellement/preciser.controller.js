'use strict';

angular.module('impactApp')
  .controller('PreciserProjetCtrl', function ($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('renouvellement', 'preciserProjet', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model]) {
        $state.go('^.^.vie_quotidienne.situation.vie_famille');
      } else {
        $state.go('^.^.envoi');
      }
    };
  });

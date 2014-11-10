'use strict';

angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'raisonRenouvellement', $scope.formAnswers);

    if (angular.isUndefined($scope.formAnswers.raisonRenouvellement)) {
      $scope.formAnswers.raisonRenouvellement = {};
    }

    $scope.nextStep = function() {
      var answer = $scope.formAnswers.raisonRenouvellement;
      if (answer) {
        $state.go('^.taux');
      } else {
        $state.go('^.liste_droits');
      }
    };
  });

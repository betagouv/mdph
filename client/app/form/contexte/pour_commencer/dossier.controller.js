'use strict';

angular.module('impactApp')
  .controller('DossierCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'nouveauDossier', $scope.formAnswers);

    $scope.nextStep = function() {
      var answer = $scope.sectionModel[$scope.question.model];
      if (answer) {
        $state.go('^.date_naissance');
      } else {
        $state.go('^.renouvellement');
      }
    };
  });

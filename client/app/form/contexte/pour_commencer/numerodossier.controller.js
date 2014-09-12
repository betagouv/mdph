'use strict';

angular.module('impactApp')
  .controller('NumDossierCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('numDossier', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.renouvellement');
    };
  });

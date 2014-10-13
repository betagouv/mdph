'use strict';

angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state, RequestService, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'logement', $scope.formAnswers);

    $scope.nextStep = function() {
      if (RequestService.estRenouvellement($scope.formAnswers)) {
        $state.go('^.fin_de_droits');
      } else {
        $scope.sections[1].isEnabled = true;
        $state.go('^.^.vos_besoins.quotidien');
      }
    };
  });

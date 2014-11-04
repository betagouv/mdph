'use strict';

angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state, FormService, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'logement', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_besoins.quotidien');
    };
  });

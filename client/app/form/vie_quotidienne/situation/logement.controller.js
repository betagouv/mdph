'use strict';

angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('logement', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.fin_de_droits');
    };
  });

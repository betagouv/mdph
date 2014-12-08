'use strict';

angular.module('impactApp')
  .controller('ConsentementCtrl', function($scope, $state, QuestionService, FormService) {

    $scope.question = QuestionService.get('contexte', 'consentement', $scope.formAnswers);
    $scope.name = FormService.getName($scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });

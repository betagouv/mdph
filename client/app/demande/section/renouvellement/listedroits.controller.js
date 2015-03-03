'use strict';

angular.module('impactApp')
  .controller('ListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig, request, prestations, question, nextStep) {
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
    $scope.nextStep = nextStep;
    $scope.question = question;

    if (!request.formAnswers.prestations) {
      request.formAnswers.prestations = {};
    }

    $scope.prestations = prestations;
    datepickerConfig.datepickerMode = 'day';
  });

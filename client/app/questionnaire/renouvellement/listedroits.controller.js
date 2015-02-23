'use strict';

angular.module('impactApp')
  .controller('ListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig, prestations, question, nextStep) {
    $scope.isLastQuestion = $state.current.data.isLastQuestion;
    $scope.nextStep = nextStep;
    $scope.question = question;

    if (!$scope.formAnswers.prestations) {
      $scope.formAnswers.prestations = {};
    }

    $scope.prestations = prestations;
    datepickerConfig.datepickerMode = 'day';
  });

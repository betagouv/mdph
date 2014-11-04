'use strict';

angular.module('impactApp')
  .controller('RenouvellementListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig, prestations) {
    if (!$scope.formAnswers.prestations) {
      $scope.formAnswers.prestations = {};
    }

    $scope.prestations = prestations;
    $scope.question = QuestionService.get('vieQuotidienne', 'finDroits', $scope.formAnswers);
    datepickerConfig.datepickerMode = 'day';

    $scope.nextStep = function() {
      $scope.goToFinalSection();
    };
  });

'use strict';

angular.module('impactApp')
  .controller('RenouvellementListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig) {

    $scope.question = QuestionService.get('vieQuotidienne', 'finDroits', $scope.formAnswers);

    if (angular.isUndefined($scope.formAnswers.mesPrestations)) {
      $scope.formAnswers.mesPrestations = [];
    }
    
    datepickerConfig.datepickerMode = 'day';

    $scope.nextStep = function() {
      $scope.goToFinalSection();
    };
  });

'use strict';

angular.module('impactApp')
  .controller('FinDeDroitsCtrl', function($scope, $state, datepickerConfig, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'finDroits', $scope.formAnswers);

    if (angular.isUndefined($scope.formAnswers.mesPrestations)) {
      $scope.formAnswers.mesPrestations = [];
    }

    datepickerConfig.datepickerMode = 'day';

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_besoins.quotidien');
    };
  });

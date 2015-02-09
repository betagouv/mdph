'use strict';

angular.module('impactApp')
  .controller('ListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig, prestations) {
    if (!$scope.formAnswers.prestations) {
      $scope.formAnswers.prestations = {};
    }

    $scope.prestations = prestations;
    $scope.question = QuestionService.get('renouvellement', 'finDroits', $scope.formAnswers);
    datepickerConfig.datepickerMode = 'day';

    $scope.nextStep = function() {
      if ($scope.sectionModel.evolution === 'stable') {
        $state.go('^.preciser_projet');
      } else {
        $state.go('^.^.vie_quotidienne.situation.vie_famille');
      }
    };
  });

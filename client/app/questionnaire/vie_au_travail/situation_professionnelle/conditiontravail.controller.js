'use strict';

angular.module('impactApp')
  .controller('ConditionTravailCtrl', function($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('travail', 'conditionTravail', $scope.formAnswers);
    $scope.hideBack = true;

    $scope.nextStep = function() {
      if ($scope.sectionModel.conditionTravail) {
        $state.go('^.milieu');
      } else {
        $state.go('^.sans_emploi.passe');
      }
    };
  });

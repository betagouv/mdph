'use strict';

angular.module('impactApp')
  .controller('ConditionTravailCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'conditionTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = false;
      if ($scope.sectionModel.conditionTravail) {
        $state.go('^.milieu');
      } else {
        $state.go('^.sans_emploi.passe');
      }
    };
  });

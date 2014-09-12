'use strict';

angular.module('impactApp')
  .controller('ConditionScolaireCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'condition', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel.condition) {
        $state.go('^.type_scolaire');
      } else {
        $state.go('^.raison_non_scolaire');
      }
    };
  });

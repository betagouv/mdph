'use strict';

angular.module('impactApp')
  .controller('ConditionAidantCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'condition', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel.condition) {
        $scope.sections[0].isEnabled = true;
        $state.go('^.situation.lien');
      } else {
        $scope.goToNextSection($scope.currentSectionId);
      }
    };
  });

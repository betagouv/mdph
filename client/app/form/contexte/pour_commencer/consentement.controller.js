'use strict';

angular.module('impactApp')
  .controller('ConsentementCtrl', function($scope, $state, QuestionService, FormService) {

    $scope.question = QuestionService.get('contexte', 'consentement', $scope.formAnswers);
    $scope.name = FormService.getName($scope.formAnswers);

    $scope.checkNextStep = function(value) {
      if (value === 'autre') {
        return false === $scope.sectionModel[$scope.question.detailModel];
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.code_postal');
    };
  });

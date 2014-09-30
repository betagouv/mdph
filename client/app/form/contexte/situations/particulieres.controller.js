'use strict';

angular.module('impactApp')
  .controller('ParticulieresCtrl', function ($scope, datepickerConfig, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'urgences', $scope.formAnswers);
    datepickerConfig.datepickerMode = 'day';
    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });

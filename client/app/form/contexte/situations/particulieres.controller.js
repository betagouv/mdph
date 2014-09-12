'use strict';

angular.module('impactApp')
  .controller('ParticulieresCtrl', function ($scope, QuestionService) {

    $scope.question = QuestionService.get('urgences', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });

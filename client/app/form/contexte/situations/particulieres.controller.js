'use strict';

angular.module('impactApp')
  .controller('ParticulieresCtrl', function ($scope, QuestionService) {

    $scope.question = QuestionService.get('contexte', 'urgences', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {};
    }

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    
    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });

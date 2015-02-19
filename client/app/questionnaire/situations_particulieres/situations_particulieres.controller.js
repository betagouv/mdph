'use strict';

angular.module('impactApp')
  .controller('SituationsParticulieresCtrl', function ($scope, sectionModel, question, hideBack, isLastQuestion) {
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.hideBack = hideBack;
    $scope.isLastQuestion = isLastQuestion;

    $scope.nextStep = function() {
      $scope.$parent.saveSection($scope.sectionModel);
    };
  });

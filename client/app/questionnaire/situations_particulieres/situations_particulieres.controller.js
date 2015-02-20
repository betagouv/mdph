'use strict';

angular.module('impactApp')
  .controller('SituationsParticulieresCtrl', function ($scope, sectionModel, question, hideBack, isLastQuestion, saveSection) {
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.hideBack = hideBack;
    $scope.isLastQuestion = isLastQuestion;

    $scope.nextStep = function() {
      saveSection();
    };
  });

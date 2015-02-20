'use strict';

angular.module('impactApp')
  .controller('SituationsParticulieresCtrl', function ($scope, $state, sectionModel, question, nextStep) {
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion =  $state.current.data.isLastQuestion;
    $scope.nextStep = nextStep;
  });

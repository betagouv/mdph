'use strict';


angular.module('impactApp')
  .controller('SimpleStepCtrl', function($scope, $state, section, sectionModel, question, nextStep) {

    $scope.section = section;
    $scope.sectionModel = sectionModel;
    $scope.question = question;
    $scope.nextStep = nextStep;
    $scope.hideBack = $state.current.data.hideBack;
    $scope.isLastQuestion = $state.current.data.isLastQuestion;

  });

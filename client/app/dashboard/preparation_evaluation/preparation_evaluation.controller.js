'use strict';

angular.module('impactApp')
  .controller('PreparationEvalCtrl', function($scope, evalQuestions, PreparationEvaluationService) {
    $scope.evalQuestions = evalQuestions;

    $scope.answers = {};

    $scope.checkDocs = function() {
      $scope.docsList =  PreparationEvaluationService.getDocsList($scope.answers, $scope.docsList);
    };

  });

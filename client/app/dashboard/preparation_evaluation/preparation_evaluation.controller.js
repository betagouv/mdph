'use strict';

angular.module('impactApp')
  .controller('PreparationEvalCtrl', function ($scope, evalQuestions) {
    $scope.evalQuestions = evalQuestions;

    $scope.answers = {};
  });

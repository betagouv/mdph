'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($scope, request) {
    $scope.currentRequest = request;
    $scope.formAnswers = $scope.currentRequest.formAnswers;

    $scope.getCompletion = function(section) {
      if (typeof $scope.formAnswers[section] === 'undefined') {
        return 0;
      }

      return 50;
    };
  });

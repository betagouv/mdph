'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($scope) {
    $scope.formAnswers = $scope.currentRequest.formAnswers;
  });

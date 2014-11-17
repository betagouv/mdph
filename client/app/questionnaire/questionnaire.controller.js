'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($scope, $sessionStorage) {
    $scope.formAnswers = $sessionStorage.formAnswers;
  });

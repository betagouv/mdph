'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($scope, RequestService, RequestResource) {
    $scope.currentRequest = RequestService.getCurrent();

    if (!$scope.currentRequest) {
      $scope.currentRequest = new RequestResource();
      $scope.currentRequest.formAnswers = {};
      RequestService.setCurrent($scope.currentRequest);
    }

    RequestService.setCurrentMdph($scope.currentMdph);

    $scope.formAnswers = $scope.currentRequest.formAnswers;
  });

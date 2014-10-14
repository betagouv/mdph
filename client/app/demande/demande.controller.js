'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, RequestService, RequestStepService, Auth, currentRequest) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentRequest = currentRequest;

    $scope.steps = RequestStepService.getFormSteps($scope.currentRequest, 'demande');
    $scope.$on('refreshFormStepSection', function () {
      $scope.steps = RequestStepService.getFormSteps($scope.currentRequest, 'demande');
    });
  });

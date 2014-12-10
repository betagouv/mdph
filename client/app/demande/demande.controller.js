'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, RequestService, RequestStepService, Auth, currentRequest) {
    RequestService.setCurrent(currentRequest);
    $scope.currentRequest = currentRequest;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var refresh = function () {
      $scope.steps = RequestStepService.getFormSteps($scope.currentRequest, 'demande');

    };

    refresh();
    $scope.$on('refreshFormStepSection', function () {
      refresh();
    });
  });

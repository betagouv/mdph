'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, RequestService, RequestStepService, request, Auth) {
    $scope.form = request;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.updatedAt = RequestService.updatedAt;
    $scope.steps = RequestStepService.getFormSteps(request, 'demande');

    $scope.$on('refreshFormStepSection', function () {
      $scope.steps = RequestStepService.getFormSteps(request, 'demande');
    });
  });

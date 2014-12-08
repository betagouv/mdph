'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, RequestService, RequestStepService, Auth, currentRequest, $sessionStorage) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentRequest = currentRequest;
    $sessionStorage.formAnswers = currentRequest.formAnswers;

    var refresh = function () {
      $scope.steps = RequestStepService.getFormSteps($scope.currentRequest, 'demande');

    };

    refresh();

    $scope.$on('refreshFormStepSection', function () {
      refresh();
    });
  });

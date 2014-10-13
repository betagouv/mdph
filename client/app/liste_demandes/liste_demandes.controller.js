'use strict';

angular.module('impactApp')
  .controller('ListeDemandesCtrl', function ($scope, requests, current, currentStep, RequestService) {
    $scope.updatedAt = RequestService.updatedAt;
    $scope.requests = requests;
    $scope.current = current;
    $scope.currentStep = currentStep;
  });

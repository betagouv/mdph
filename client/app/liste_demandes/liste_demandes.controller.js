'use strict';

angular.module('impactApp')
  .controller('ListeDemandesCtrl', function ($scope, $state, RequestService, requests) {
    $scope.updatedAt = RequestService.updatedAt;

    $scope.requests = requests;

    $scope.createRequest = RequestService.createRequest;

    $scope.getCurrentStep = RequestService.getCurrentStep;

    $scope.onRequestCreated = function(error) {
      if (error) {
        // TODO
      } else {
        $state.go('form');
      }
    };
  });

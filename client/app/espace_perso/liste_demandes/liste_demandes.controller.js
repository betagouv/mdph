'use strict';

angular.module('impactApp')
  .controller('ListeDemandesCtrl', function ($scope, $state, RequestService, requests) {
    $scope.updatedAt = RequestService.updatedAt;
    $scope.requests = requests;
  });

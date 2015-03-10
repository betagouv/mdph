'use strict';

angular.module('impactApp')
  .controller('RelancesCtrl', function ($scope, $http, $state, RequestStepService, RequestService, requestSteps, requests) {
    $scope.requests = _.sortBy(requests, $scope.updatedAt);
  });

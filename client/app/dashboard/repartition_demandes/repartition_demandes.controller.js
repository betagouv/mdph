'use strict';

angular.module('impactApp')
  .controller('RepartitionDemandesCtrl', function ($scope, users, requests) {
    $scope.users = users;
    $scope.requests = _.sortBy(requests, $scope.updatedAt);
  });

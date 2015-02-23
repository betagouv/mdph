'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, users, currentUser, pendingRequests) {
    $scope.users = users;
    $scope.currentUser = currentUser;
    $scope.pendingRequests = pendingRequests;

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

'use strict';

angular.module('impactApp')
  .filter('capitalize', function() {
    return function(input) {
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  })
  .controller('RequestsCtrl', function ($scope, users, currentUser, pendingRequests) {
    $scope.users = users;
    $scope.currentUser = currentUser;
    $scope.pendingRequests = pendingRequests;

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

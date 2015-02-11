'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, users, currentUser) {
    $scope.users = users;
    $scope.currentUser = currentUser;
  });

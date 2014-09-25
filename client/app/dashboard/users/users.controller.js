'use strict';

angular.module('impactApp')
  .controller('UsersCtrl', function ($scope, $state, User, users) {
    $scope.users = users;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u._id === user._id) {
          $scope.users.splice(i, 1);
          $state.go('dashboard.users');
        }
      });
    };
  });

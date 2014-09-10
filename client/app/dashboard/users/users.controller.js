'use strict';

angular.module('impactApp')
  .controller('UsersCtrl', function ($scope, User, users) {

    $scope.users = users;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });

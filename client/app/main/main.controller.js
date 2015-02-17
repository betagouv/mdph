'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, $state, $sessionStorage, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
  });

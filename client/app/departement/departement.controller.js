'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, $state, Auth, mdph) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.mdph = mdph;
  });

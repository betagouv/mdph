'use strict';

angular.module('impactApp')
  .controller('DetailUserCtrl', function ($scope, user) {
    $scope.user = user;
  });

'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, users) {
    $scope.users = users;
  });

'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function ($scope, user, requests) {
    $scope.requests = requests;
    $scope.user = user;
  });

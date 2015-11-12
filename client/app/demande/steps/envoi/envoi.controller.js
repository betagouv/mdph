'use strict';

angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, step, request, $cookies) {
    $scope.request = request;
    $scope.step = step;
    $scope.token = $cookies.get('token');
  });

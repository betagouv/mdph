'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, $cookies, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');

    $scope.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };
  });

'use strict';

angular.module('impactApp')
  .controller('EvaluatorCtrl', function ($scope, user, userRequests) {
    $scope.user = user;
    $scope.userRequests = userRequests;
  });

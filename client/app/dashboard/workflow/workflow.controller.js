'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, requestCountByStatus) {
    $scope.requestCountByStatus = requestCountByStatus;
  });

'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, visibleBanettes, requestCountByStatus) {
    $scope.banettes = visibleBanettes;

    $scope.getStatusCount = function(status) {
      return requestCountByStatus[status];
    };
  });

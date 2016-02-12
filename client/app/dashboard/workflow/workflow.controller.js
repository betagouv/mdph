'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, visibleBanettesWithCount) {
    $scope.banettes = visibleBanettesWithCount;
  });

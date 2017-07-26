'use strict';

angular.module('impactApp')
  .controller('EvaluationDashboardCtrl', function($scope, $state, currentUser) {
    $scope.mdph = currentUser.mdph;
  });

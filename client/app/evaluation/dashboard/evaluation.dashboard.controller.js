'use strict';

angular.module('impactApp')
  .controller('EvaluationDashboardCtrl', function($scope, $state, currentUser) {
    this.mdph  = currentUser.mdph;
  });

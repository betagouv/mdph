'use strict';

angular.module('impactApp')
  .controller('AdminDashboardCtrl', function($scope, $state, currentUser) {
    this.mdph  = currentUser.mdph;
  });

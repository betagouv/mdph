'use strict';

angular.module('impactApp')
  .controller('EvaluationCtrl', function($scope, $state, Auth) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;
  });


'use strict';

angular.module('impactApp')
  .controller('EvaluationCtrl', function($scope, $state, Auth) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.shouldShowDashboardLink =  () => this.getCurrentUser().mdph.enabled;
    this.getCurrentMdphZipcode =  () => this.getCurrentUser().mdph.zipcode;
  });


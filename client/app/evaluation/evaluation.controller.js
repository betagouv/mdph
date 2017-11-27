'use strict';

angular.module('impactApp')
  .controller('EvaluationCtrl', function($scope, $state, Auth) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.showDashboardLink =  () => this.getCurrentUser().mdph.enabled;
    this.showAdminLink =  () => Auth.hasRole(this.getCurrentUser(), 'admin');
    this.getCurrentMdphZipcode =  () => this.getCurrentUser().mdph.zipcode;
  });


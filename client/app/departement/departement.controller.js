'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($scope, Auth, currentMdph, currentUser) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;

    this.showDashboard = () => {
      return Auth.getCurrentUser() && Auth.isAdminMdph(Auth.getCurrentUser(), currentMdph);
    };
  });

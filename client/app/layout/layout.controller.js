'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $state, Auth, currentMdph) {
    this.currentMdph = currentMdph;

    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.shouldShowDashboard = () => $state.includes('dashboard');

    if (currentMdph) {
      this.mdphName = 'Mdph ' + currentMdph.name;
      this.logo = 'assets/images/' + currentMdph.logo;
    } else {
      this.mdphName = 'Choix de votre département';
      this.logo = 'assets/images/logo_marianne.png';
    }
  });

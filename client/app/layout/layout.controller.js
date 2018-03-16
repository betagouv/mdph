'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $state, Auth, currentMdph) {
    this.currentMdph = currentMdph;

    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.shouldShowDashboard = () => $state.includes('dashboard');
    this.showAdminLink =  () => Auth.isAdmin(this.getCurrentUser());
    this.showEvaluationLink = () => this.currentMdph.evaluate && Auth.isAdminMdph(Auth.getCurrentUser(), currentMdph);

    this.shouldShowLogin = () => this.currentMdph.opened;

    if (currentMdph) {
      this.mdphName = 'Mdph ' + currentMdph.name;
    } else {
      this.mdphName = 'Choix de votre département';
    }

    this.showDashboard = () => {
      return currentMdph && Auth.getCurrentUser() && Auth.isAdminMdph(Auth.getCurrentUser(), currentMdph);
    };
  });

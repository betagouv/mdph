'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $state, Auth, currentMdph, currentUser) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.shouldShowDashboard = () => $state.includes('dashboard');
    this.showAdminLink =  () => Auth.isAdmin(currentUser);
    this.showGestionLink =  () => Auth.isUser(currentUser);
    this.showEvaluationLink = () => this.currentMdph.evaluate && Auth.isAdminMdph(currentUser, currentMdph);

    this.shouldShowLogin = () => this.currentMdph.opened;

    if (currentMdph) {
      this.mdphName = 'Mdph ' + currentMdph.name;
    } else {
      this.mdphName = 'Choix de votre département';
    }

    this.showDashboard = () => {
      return currentMdph && currentUser && Auth.isAdminMdph(currentUser, currentMdph);
    };
  });

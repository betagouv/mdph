'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($rootScope, $scope, $state, Auth, ProfileResource, currentMdph, currentUser) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.shouldShowDashboard = () => $state.includes('dashboard');
    this.showAdminLink =  () => Auth.isAdmin(currentUser);
    this.showGestionLink =  () => Auth.isUser(currentUser);
    this.showEvaluationLink = () => this.currentMdph.evaluate && Auth.isAdminMdph(currentUser, currentMdph);

    this.shouldShowLogin = () => this.currentMdph.opened;

    $rootScope.currentMenu = function(userId, status) {
      $scope.navUserId = userId;
      $scope.navStatus = status;
    };

    $scope.toggle = {};

    if (currentMdph) {
      this.mdphName = 'Mdph ' + currentMdph.name;
    } else {
      this.mdphName = 'Choix de votre département';
    }

    this.showDashboard = () => {
      return currentMdph && currentUser && Auth.isAdminMdph(currentUser, currentMdph);
    };

    this.gestionLinkValue = function() {
      ProfileResource.query({userId: currentUser._id}).$promise.then(function(profilList) {
        if (profilList.length === 1) {
          return $state.go('gestion_demande', {profilId: profilList[0]._id});
        }

        return $state.go('gestion_profil', {}, {reload: true});
      });
    };
  });

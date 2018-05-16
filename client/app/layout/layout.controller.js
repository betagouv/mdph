'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($window, $rootScope, $scope, $state, Auth, ProfileResource, currentMdph, currentUser) {
    let sizeMaxToReduceMenu = 992; //521

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

    $scope.size = $window.innerWidth;
    $scope.showMenu = $window.innerWidth < sizeMaxToReduceMenu;
    $scope.toggle = null;

    var wind = angular.element($window).on('resize', function() {
      $scope.showMenu = $window.innerWidth < sizeMaxToReduceMenu;
      $scope.size = $window.innerWidth;
    });

    wind.bind('resize', function() {
      $scope.$apply();
    });

    if (currentMdph) {
      this.mdphName = 'Mdph ' + currentMdph.name;
    } else {
      this.mdphName = 'Choix de votre département';
    }

    this.showDashboard = () => {
      return currentMdph && currentUser && Auth.isAdminMdph(currentUser, currentMdph);
    };

    this.gestionLinkValue = function() {
      if (Auth.hasRole(currentUser, 'user')) {

        ProfileResource.query({userId: currentUser._id}).$promise.then(function(profilList) {
          if (profilList.length === 1) {
            return $state.go('gestion_demande', {profilId: profilList[0]._id});
          }

          return $state.go('gestion_profil', {}, {reload: true});
        });
      } else if (Auth.hasRole(currentUser, 'adminMdph')) {

        return $state.go('dashboard.workflow', {zipcode: currentMdph.zipcode, userId:'me', status:'emise'}, {reload: true});
      } else if (Auth.hasRole(currentUser, 'admin')) {

        return $state.go('admin.main', {}, {reload: true});
      }

    };
  });

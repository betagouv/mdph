'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function($scope, $rootScope, $stateParams, $location, Auth, $sessionStorage, $localStorage, $timeout, $state, User, Notification) {
    $scope.menu = [
    {
      title: 'Accueil',
      link: 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;
    $scope.$storage = $localStorage;
    $scope.notifications = [];
    $scope.showNotifications = false;
    $scope.getCurrentUser = Auth.getCurrentUser;

    angular.element(document).ready(function() {
      $timeout(function() {
        $scope.showIntro = !$scope.$storage.hideIntro;
      }, 500);
    });

    $scope.toggleNotifications = function() {
      $scope.showNotifications = !$scope.showNotifications;
    };

    $scope.momentFromNow = function(date) {
      return moment(date).fromNow();
    };

    $scope.hideIntro = function() {
      $scope.showIntro = false;
      $scope.$storage.hideIntro = true;
    };

    $scope.logout = function() {
      Auth.logout();
      $sessionStorage.$reset();
      $location.path('/login');
    };

    $scope.getLogoSrc = function() {
      var assetDir = 'assets/images/';
      var defaultLogo = 'logo_marianne.png';
      if ($scope.mdph && $scope.mdph.$resolved === true) {
        return assetDir + $scope.mdph.logo;
      } else {
        return assetDir + defaultLogo;
      }
    };

    $scope.getIndexSref = function() {
      if ($scope.mdph && $scope.mdph.$resolved === true) {
        return 'departement({codeDepartement: ' + $scope.mdph.zipcode + '})';
      } else {
        return 'main';
      }
    };

    $scope.removeNotif = function(notification, index) {
      Notification.delete({id: notification._id}, function() {
        $scope.notifications.splice(index, 1);
        if ($scope.notifications.length === 0) {
          $scope.showNotifications = false;
        }
      });
    };

    $scope.goState = function(notification, index) {
      $state.go(notification.state, { shortId: notification.request });
      Notification.delete({id: notification._id}, function() {
        $scope.notifications.splice(index, 1);
        $scope.showNotifications = false;
      });
    };
  });

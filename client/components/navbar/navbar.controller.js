'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sessionStorage, $localStorage, $timeout, User) {
    $scope.menu = [
    {
      'title': 'Accueil',
      'link': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;
    $scope.user = Auth.getCurrentUser();
    $scope.$storage = $localStorage;
    $scope.notifications = [];

    if ($scope.user.$promise) {
      $scope.user.$promise.then(function(data) {
        User.queryNotifications({id: data._id}, function(notifications) {
           $scope.notifications = notifications;
        });
      });
    }

    angular.element(document).ready(function() {
      $timeout(function() {
        $scope.showIntro = !$scope.$storage.hideIntro;
      }, 500);
    });

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
      if ($scope.currentMdph && $scope.currentMdph.$resolved === true) {
        return assetDir + $scope.currentMdph.logo;
      } else {
        return assetDir + defaultLogo;
      }
    };

    $scope.getIndexSref = function() {
      if ($scope.currentMdph && $scope.currentMdph.$resolved === true) {
        return 'departement({codeDepartement: ' + $scope.currentMdph.zipcode + '})';
      } else {
        return 'main';
      }
    };
  });

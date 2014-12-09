'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sessionStorage, $localStorage, $timeout) {
    $scope.menu = [
    {
      'title': 'Accueil',
      'link': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.$storage = $localStorage;

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

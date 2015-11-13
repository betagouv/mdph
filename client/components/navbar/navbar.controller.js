'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function($scope, $rootScope, $stateParams, $location, Auth, $sessionStorage, $localStorage, $timeout, $state) {
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

    $scope.getCurrentUser = Auth.getCurrentUser;

    angular.element(document).ready(function() {
      $timeout(function() {
        $scope.showIntro = !$scope.$storage.hideIntro;
      }, 500);
    });

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
  });

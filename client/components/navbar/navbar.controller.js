'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function($scope, $rootScope, $state, $stateParams, $location, Auth, $sessionStorage, $localStorage, $timeout) {
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

    var assetDir = 'assets/images/';
    $scope.logo = assetDir + 'logo_marianne.png';

    $timeout(function() {
      if ($rootScope.mdph) {
        $scope.logo = assetDir + $rootScope.mdph.logo;
      }
    });
  });

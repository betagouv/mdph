'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $rootScope, MenuCollapsed, Auth, $localStorage, $timeout, currentMdph) {
    $scope.isCollapsed = true;
    $scope.currentMdph = currentMdph;

    $scope.isCollapsed = MenuCollapsed.isCollapsed;
    $scope.toggleMenu = MenuCollapsed.toggle;

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = Auth.logout;

    function setInitial() {
      $scope.mdphName = 'Choix de votre département';
      $scope.logo = 'assets/images/logo_marianne.png';
      $scope.currentMdph = null;
      $scope.showChoice = false;
    }

    angular.element(document).ready(function() {
      $timeout(function() {
        $scope.showIntro = !$localStorage.hideIntro;
      }, 500);
    });

    $scope.hideIntro = function() {
      $scope.showIntro = false;
      $localStorage.hideIntro = true;
    };

    $scope.toggleChoice = function() {
      $scope.showChoice = !$scope.showChoice;
    };

    $scope.$on('event:mdph-changed', function(event, currentMdph) {
      $scope.currentMdph = currentMdph;
      $scope.mdphName = 'Mdph ' + currentMdph.name;
      $scope.logo = 'assets/images/' + currentMdph.logo;
      $scope.showChoice = false;
    });

    $scope.$on('event:mdph-none', function() {
      setInitial();
    });

    setInitial();
  });

'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $rootScope, Auth, $localStorage, $timeout, mdphs, user) {
    $scope.isCollapsed = true;
    $scope.mdphs = mdphs;
    $scope.user = user;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = Auth.logout;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;

    function setInitial() {
      $scope.mdphName = 'Choix de votre département';
      $scope.logo = 'assets/images/logo_marianne.png';
      $scope.currentMdph = null;
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

    //TODO: Select mdph
    $scope.toggleChoice = function() {
      $scope.showChoice = !$scope.showChoice;
    };

    $scope.$on('event:mdph-changed', function(event, currentMdph) {
      $scope.currentMdph = currentMdph;
      $scope.mdphName = 'Mdph ' + currentMdph.name;
      $scope.logo = 'assets/images/' + currentMdph.logo;
    });

    $scope.$on('event:mdph-none', function() {
      setInitial();
    });

    setInitial();
  });

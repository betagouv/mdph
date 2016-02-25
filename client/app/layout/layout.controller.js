'use strict';

angular.module('impactApp')
  .controller('LayoutCtrl', function($scope, $rootScope, Auth, $localStorage, $timeout, mdphs) {
    $scope.isCollapsed = true;
    $scope.mdphs = mdphs;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = Auth.logout;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.mdphName = 'Choix de votre département';
    $scope.logo = 'assets/images/logo_marianne.png';

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
  });

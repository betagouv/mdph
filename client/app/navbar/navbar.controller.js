'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function($scope, $rootScope, Auth, $localStorage, $timeout, MdphResource) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = Auth.logout;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;
    $scope.mdphs = MdphResource.query({enabled: true});

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.mdphName = $scope.mdph ? 'Mdph ' + $scope.mdph.name : 'Choix de votre département';
    $scope.logo = $scope.mdph ? 'assets/images/' + $scope.mdph.logo : 'assets/images/logo_marianne.png';

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

  });

'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function($scope, $rootScope, Auth, $localStorage, $timeout, MdphResource) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.logout = Auth.logout;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isAdminMdph = Auth.isAdminMdph;
    $scope.showChoice = true;
    $scope.mdphs = MdphResource.query({enabled: true});

    $scope.getCurrentUser = Auth.getCurrentUser;

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

    var assetDir = 'assets/images/';
    $scope.logo = assetDir + 'logo_marianne.png';

    $timeout(function() {
      if ($rootScope.mdph) {
        $scope.logo = assetDir + $rootScope.mdph.logo;
      }
    });
  });

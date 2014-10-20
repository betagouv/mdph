'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sessionStorage, $timeout) {
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
    $scope.isUser = Auth.isUser;

    $scope.$storage = $sessionStorage;

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
  });

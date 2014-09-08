'use strict';

angular.module('impactApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sessionStorage) {
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

    $scope.logout = function() {
      Auth.logout();
      $sessionStorage.$reset();
      $location.path('/login');
    };
  });

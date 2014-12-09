'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, $state, $sessionStorage, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.start = function() {
      $state.go('choix_mdph');
    };

    $scope.getMdphName = function() {
      return '';
    };

    $scope.getVerticalOffset = function() {
      return $sessionStorage.hideIntro ? '-925' : '-948';
    };
  });

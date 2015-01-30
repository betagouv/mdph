'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, $state, $sessionStorage, Auth, RequestService) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.start = function() {
      RequestService.resetCurrent();
      $state.go('choix_mdph');
    };

    $scope.listeDemande = function() {
      $state.go('espace_perso.liste_demandes');
    };

    $scope.getMdphName = function() {
      return '';
    };

    $scope.getVerticalOffset = function() {
      return $sessionStorage.hideIntro ? '-925' : '-948';
    };

    $scope.getMdphBgClass = function() {
      return 'bg';
    };
  });

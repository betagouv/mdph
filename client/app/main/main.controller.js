'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, $state, $sessionStorage, Auth) {
    if (Auth.isLoggedIn()) {
      $scope.sref = 'espace_perso.liste_demandes';
    } else {
      $scope.sref = 'choix_mdph';
    }
  });

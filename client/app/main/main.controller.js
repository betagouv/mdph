'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, Auth) {
    Auth.isLoggedInAsync(function(isLoggedIn) {
      if (isLoggedIn) {
        $scope.btnText = 'Voir vos demandes';
        $scope.btnRef = 'liste_demandes';
      } else {
        $scope.btnText = 'Commencer';
        $scope.btnRef = 'form';
      }
    });
  });

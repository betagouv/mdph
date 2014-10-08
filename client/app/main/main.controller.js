'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, Auth) {
    Auth.isLoggedInAsync(function(isLoggedIn) {
      if (isLoggedIn) {
        $scope.btnText = 'Voir ma demande';
        $scope.btnRef = 'demande';
      } else {
        $scope.btnText = 'Commencer';
        $scope.btnRef = 'form';
      }
    });
  });

'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, Auth, $sessionStorage) {
    Auth.isLoggedInAsync(function(isLoggedIn) {
      if (isLoggedIn) {
        $scope.btnText = 'Voir vos demandes';
        $scope.btnRef = 'liste_demandes';
      } else {
        $scope.btnText = 'Commencer';
        $scope.btnRef = 'questionnaire';
      }
    });

    $scope.getVerticalOffset = function() {
      return $sessionStorage.hideIntro ? '-925' : '-948';
    };
  });

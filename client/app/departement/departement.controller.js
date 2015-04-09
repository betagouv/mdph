'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, $state, Auth, mdph) {
    if (Auth.isLoggedIn()) {
      $scope.sref = 'espace_perso.liste_demandes';
    } else {
      $scope.sref = '.demande({shortId: \'nouvelle_demande\'})';
    }

    $scope.mdph = mdph;
  });

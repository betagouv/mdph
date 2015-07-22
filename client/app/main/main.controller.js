'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function ($scope, $state, mdph, user) {
    $scope.user = user;
    $scope.mdph = mdph;

    $scope.sref = mdph ? '.demande.obligatoire({shortId: \'nouvelle_demande\'})' : 'choix_mdph';
  });

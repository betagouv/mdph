'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function($scope, $http, users, secteurs, currentUser, incomplete, banettes) {

    $scope.banettes = banettes;

    secteurs.push({_id: 'autres', name: 'Sans secteur'});
    $scope.users = users;
    $scope.secteurs = secteurs;
    $scope.currentUser = currentUser;
    $scope.incomplete = incomplete;

    secteurs.forEach(function(secteur) {
      $http({method: 'GET', url: '/api/secteurs/' + secteur._id + '/countRequests'}).then(function(result) {
        secteur.pendingRequests = result.data;
      });
    });

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

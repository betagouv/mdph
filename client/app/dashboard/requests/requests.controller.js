'use strict';

angular.module('impactApp')
  .filter('capitalize', function() {
    return function(input) {
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  })
  .controller('RequestsCtrl', function ($scope, $http, users, secteurs, currentUser, incomplete) {
    secteurs.push({_id: null, name: 'Sans secteur'});
    $scope.users = users;
    $scope.secteurs = secteurs;
    $scope.currentUser = currentUser;
    $scope.incomplete = incomplete;

    secteurs.forEach(function (secteur) {
      $http({method: 'HEAD', url: '/api/secteurs/' + secteur._id + '/requests'}).then(function(result) {
        secteur.pendingRequests = result.headers('count');
      });
    });

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

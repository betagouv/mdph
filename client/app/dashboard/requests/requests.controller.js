'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function($scope, $http, secteurs, currentUser, currentMdph, MdphResource, banettes) {
    $scope.banettes = banettes;
    $scope.users = MdphResource.queryUsers({zipcode: currentMdph.zipcode});
    $scope.secteurs = secteurs;
    $scope.currentUser = currentUser;

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

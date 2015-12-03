'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function($scope, $http, secteurs, currentUser, currentMdph, MdphResource, banettes, requestCountByStatus) {
    $scope.users = MdphResource.queryUsers({zipcode: currentMdph.zipcode});
    $scope.secteurs = secteurs;
    $scope.currentUser = currentUser;

    var byStatus = _.indexBy(requestCountByStatus, '_id');
    $scope.banettes = _.map(banettes, function(banette) {
      var currentByStatus = byStatus[banette.id];
      banette.count = currentByStatus ? currentByStatus.count : 0;
      return banette;
    });

    $scope.$on('assign-request', function() {
      $scope.pendingRequests -= 1;
    });
  });

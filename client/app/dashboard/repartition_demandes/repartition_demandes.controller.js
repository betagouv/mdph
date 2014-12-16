'use strict';

angular.module('impactApp')
  .controller('RepartitionDemandesCtrl', function ($scope, user, userRequests) {
    $scope.user = user;
    $scope.userRequests = _.sortBy(userRequests, $scope.updatedAt);
  });

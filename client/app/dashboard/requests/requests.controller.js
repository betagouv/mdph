'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, $http, $state, RequestService, requests) {
    $scope.requests = requests;
    $scope.updatedAt = RequestService.updatedAt;

    $scope.delete = function(request) {
      $http.delete('/api/requests/' + request._id).success(function() {
        angular.forEach($scope.requests, function(f, i) {
          if (f._id === request._id) {
            $scope.requests.splice(i, 1);
            $state.go('dashboard.requests');
          }
        });
      });
    };
  });

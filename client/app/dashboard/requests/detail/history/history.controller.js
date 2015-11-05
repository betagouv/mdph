'use strict';

angular.module('impactApp')
  .controller('RequestHistoryCtrl', function($scope, $http, request) {
    $scope.request = request;
    $http.get('/api/requests/' + request.shortId + '/history').then(function(result) {
      $scope.history = result.data;
    });
  });

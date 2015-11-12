'use strict';

angular.module('impactApp')
  .controller('RequestHistoryCtrl', function($scope, $http, $cookies, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');
    $http.get('/api/requests/' + request.shortId + '/history').then(function(result) {
      $scope.history = result.data;
    });
  });

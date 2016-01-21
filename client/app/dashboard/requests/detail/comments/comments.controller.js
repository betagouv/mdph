'use strict';

angular.module('impactApp')
  .controller('RequestCommentsCtrl', function($scope, $http, $window, $cookies, currentUser, currentMdph, request) {
    $scope.request = request;
    $scope.saveComment = function() {
      $http.put('/api/requests/' + request.shortId, request).then(function(response) {
        return;
      });
    };
  });

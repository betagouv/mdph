'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, $http) {
    $scope.request = {};
    $scope.errors = {};

    $scope.enterShortId = function(form) {
      $scope.submitted = true;

      $http.get('/api/request/')

      if(form.$valid) {
        shortId: $scope.request.shortId;
        $location.path('/');
      }
    };
  });
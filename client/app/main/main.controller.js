'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope, user) {
    $scope.user = user;
  });

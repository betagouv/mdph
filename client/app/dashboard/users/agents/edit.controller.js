'use strict';

angular.module('impactApp')
  .controller('AgentsEditCtrl', function ($scope, $state, user) {
    $scope.user = user;

    $scope.update = function() {
      $scope.user.$changeInfo();
      $state.go('^', {}, {reload: true});
    };

    $scope.delete = function() {
      $scope.user.$delete();
      $state.go('^', {}, {reload: true});
    };
  });

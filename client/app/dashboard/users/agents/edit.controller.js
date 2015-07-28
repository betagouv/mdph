'use strict';

angular.module('impactApp')
  .controller('AgentsEditCtrl', function($scope, $state, user, currentUser) {
    $scope.user = user;

    $scope.update = function() {
      if ($scope.user._id) {
        $scope.user.$changeInfo(function() {
          $state.go('^', {}, {reload: true});
        });
      } else {
        $scope.user.role = 'adminMdph';
        $scope.user.mdph = currentUser.mdph._id;
        $scope.user.$save(function() {
          $state.go('^', {}, {reload: true});
        });
      }
    };

    $scope.delete = function() {
      $scope.user.$delete();
      $state.go('^', {}, {reload: true});
    };
  });

'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($scope, currentUser, currentMdph) {
    $scope.$emit('event:mdph-changed', currentMdph);
    $scope.currentUser = currentUser;

    $scope.isAdmin = function() {
      return currentUser && currentUser.role.indexOf('admin') >= 0;
    };
  });

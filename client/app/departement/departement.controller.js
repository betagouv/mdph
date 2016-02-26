'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($scope, currentUser, currentMdph) {
    $scope.$emit('event:mdph-changed', currentMdph);
    $scope.currentUser = currentUser;

    $scope.isAdmin = function() {
      switch (currentUser.role) {
        case 'admin':
          return true;
        case 'adminMdph':
          return currentUser.mdph.zipcode === currentMdph.zipcode;
        default:
          return false;
      }
    };
  });

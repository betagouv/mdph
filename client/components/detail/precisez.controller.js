'use strict';

angular.module('impactApp')
  .controller('PrecisezCtrl', function($scope) {
    $scope.change = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  });

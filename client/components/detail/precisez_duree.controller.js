'use strict';

angular.module('impactApp')
  .controller('PrecisezDureeCtrl', function($scope) {

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      switch (number){
        case 1 : $scope.opened1 = true;
          break;
        case 2: $scope.opened2 = true;
          break;
      }
    };
  });

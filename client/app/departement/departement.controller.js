'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($scope, mdph) {
    $scope.$emit('event:mdph-changed', mdph);
  });

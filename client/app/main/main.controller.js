'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope) {
    $scope.$emit('event:mdph-none');
  });

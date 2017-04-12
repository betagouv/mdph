'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope, mdphs) {
    $scope.$emit('event:mdph-none');
    $scope.mdphs = mdphs;
  });

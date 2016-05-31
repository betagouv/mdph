'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope, mdphs) {
    /* istanbul ignore next */
    $scope.$emit('event:mdph-none');
    $scope.mdphs = mdphs;
  });

'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope) {
    /* istanbul ignore next */
    $scope.$emit('event:mdph-none');
  });

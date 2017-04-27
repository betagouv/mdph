'use strict';

angular.module('impactApp')
  .controller('MainCtrl', function($scope, mdphs, depsgeo) {
    $scope.$emit('event:mdph-none');
    $scope.mdphs = mdphs;
    $scope.depsgeo = depsgeo;
  });

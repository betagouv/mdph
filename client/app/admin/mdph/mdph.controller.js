'use strict';

angular.module('impactApp')
  .controller('AdminMdphCtrl', function($scope, mdph) {
    $scope.mdph = mdph;
  });

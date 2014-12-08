'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, mdph) {
    $scope.currentMdph = mdph;
  });

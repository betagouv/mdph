'use strict';

angular.module('impactApp')
  .controller('StepCtrl', function($scope, $state, stepSections, step) {
    $scope.stepSections = stepSections;
    $scope.step = step;
  });

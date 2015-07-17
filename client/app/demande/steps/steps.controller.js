'use strict';

angular.module('impactApp')
  .controller('StepsCtrl', function($scope, $state, stepSections) {
    $scope.stepSections = stepSections;
  });

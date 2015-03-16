'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, sections, GevaService) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;
  });

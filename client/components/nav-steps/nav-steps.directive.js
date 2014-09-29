'use strict';

angular.module('impactApp')
  .directive('navSteps', function () {
    return {
      templateUrl: 'components/nav-steps/nav-steps.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });

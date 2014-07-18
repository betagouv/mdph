'use strict';

/**
 * @ngdoc directive
 * @name impactApp.directive:goNext
 * @description
 * # goNext
 */
angular.module('impactApp')
  .directive('goNext', function () {
    return {
      templateUrl: 'views/partials/go_next.html',
      restrict: 'AE',
    };
  });

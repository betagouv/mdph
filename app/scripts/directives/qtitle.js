'use strict';

/**
 * @ngdoc directive
 * @name impactApp.directive:qtitle
 * @description
 * # qtitle
 */
angular.module('impactApp')
  .directive('qtitle', function () {
    return {
      template: '<div class="page-header"><h4>{{title}} <subtitle ng-if=\'subtitle\'><br/><small>{{subtitle}}</small></subtitle></h4></div>',
      restrict: 'E',
    };
  });

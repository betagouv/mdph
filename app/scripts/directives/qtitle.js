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
      template: '<div class="page-header"><h3>{{title}} <small ng-if=\'subtitle\'>: {{subtitle}}</small></h3></div>',
      restrict: 'E',
    };
  });

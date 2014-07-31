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
      templateUrl: 'views/partials/qtitle.html',
      restrict: 'E',
      controller: function($scope, $state) {
        $scope.getPageHeader = function() {
          if ($state.includes('**.contexte.**')) {
            return 'Pour commencer';
          }
        };
      }
    };
  });

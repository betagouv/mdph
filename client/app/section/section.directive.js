'use strict';

angular.module('impactApp')
  .directive('section', function () {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'app/section/section.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.getLabel = function(section) {
          return section.label;
        };
      }
    };
  });

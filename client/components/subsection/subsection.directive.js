'use strict';

angular.module('impactApp')
  .directive('subsection', function () {
    return {
      templateUrl: 'components/subsection/subsection.html',
      restrict: 'EA',
      controller: function ($scope, $state) {
        $scope.isActive = function(subsection) {
          return $state.includes(subsection.include);
        };
      }
    };
  });

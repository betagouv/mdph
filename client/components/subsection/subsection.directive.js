'use strict';

angular.module('impactApp')
  .directive('subsection', function() {
    return {
      scope: {
        sections: '='
      },
      templateUrl: 'components/subsection/subsection.html',
      restrict: 'EA',
      controller: function($scope, $state) {
        $scope.isActive = function(section) {
          return $state.includes(section.include);
        };
      }
    };
  });

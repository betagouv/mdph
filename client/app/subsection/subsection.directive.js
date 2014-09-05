'use strict';

angular.module('impactApp')
  .directive('subsection', function () {
    return {
      templateUrl: 'app/subsection/subsection.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.getLabel = function(section) {
          if ($scope.$parent.estRepresentant() && section.labelRep) {
            return section.labelRep;
          }
          return section.label;
        };
      }
    };
  });

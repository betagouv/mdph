'use strict';

angular.module('impactApp')
  .directive('subsection', function (FormService) {
    return {
      templateUrl: 'components/subsection/subsection.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.getLabel = function(section) {
          if (FormService.estRepresentant($scope.formAnswers) && section.labelRep) {
            return section.labelRep;
          }
          return section.label;
        };
      }
    };
  });

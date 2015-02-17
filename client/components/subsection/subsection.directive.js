'use strict';

angular.module('impactApp')
  .directive('subsection', function (FormService) {
    return {
      templateUrl: 'components/subsection/subsection.html',
      restrict: 'EA',
      controller: function ($scope, $state) {
        $scope.isActive = function(subsection) {
          return $state.includes(subsection.include);
        };

        $scope.getLabel = function(subsection) {
          if (FormService.estRepresentant($scope.formAnswers) && subsection.labelRep) {
            return subsection.labelRep;
          }
          return subsection.label;
        };
      }
    };
  });

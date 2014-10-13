'use strict';

angular.module('impactApp')
  .directive('subsection', function (RequestService) {
    return {
      templateUrl: 'components/subsection/subsection.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.getLabel = function(section) {
          if (RequestService.estRepresentant($scope.formAnswers) && section.labelRep) {
            return section.labelRep;
          }
          return section.label;
        };
      }
    };
  });

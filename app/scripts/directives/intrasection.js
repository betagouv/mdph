'use strict';

/**
 * @ngdoc directive
 * @name impactApp.directive:goNext
 * @description
 * # goNext
 */
angular.module('impactApp')
  .directive('intraSectionLink', function () {
    return {
      scope: {
        section: '='
      },
      controller: function($scope, $state) {
        $scope.isActive = function() {
          return $state.includes($scope.section.filter);
        };

        $scope.getLabel = function(section) {
          if ($scope.$parent.estRepresentant() && section.labelRep) {
            return section.labelRep;
          }
          return section.label;
        };
      },
      templateUrl: 'views/partials/intra_section.html',
      restrict: 'AE'
    };
  });

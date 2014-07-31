'use strict';

/**
 * @ngdoc directive
 * @name impactApp.directive:goNext
 * @description
 * # goNext
 */
angular.module('impactApp')
  .directive('sectionLink', function () {
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
      templateUrl: 'views/partials/section.html',
      restrict: 'AE'
    };
  });

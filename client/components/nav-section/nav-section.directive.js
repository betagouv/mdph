'use strict';

angular.module('impactApp')
  .directive('navSection', function ($state) {
    return {
      scope: {
        sections: '=',
      },
      templateUrl: 'components/nav-section/nav-section.html',
      link: function ($scope) {
        $scope.isSelected = function(section) {
          return $state.includes(section.include);
        };
      }
    };
  });

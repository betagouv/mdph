'use strict';

angular.module('impactApp')
  .directive('navSection', function (SectionConstants, $state) {
    return {
      scope: {
        renouvellement: '=',
      },
      templateUrl: 'components/nav-section/nav-section.html',
      link: function ($scope) {
        if ($scope.renouvellement) {
          SectionConstants[2].isOptionnal = true;
        } else {
          SectionConstants[2].isOptionnal = false;
        }
        $scope.sections = $scope.renouvellement ? SectionConstants : _.where(SectionConstants, {'renew': undefined});

        $scope.isSelected = function(section) {
          return $state.includes(section.include);
        };
      }
    };
  });

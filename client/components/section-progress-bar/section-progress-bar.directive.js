'use strict';

angular.module('impactApp')
  .directive('sectionProgressBar', function () {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'components/section-progress-bar/section-progress-bar.html',
      restrict: 'E'
    };
  });

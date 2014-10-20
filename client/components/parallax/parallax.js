'use strict';

angular.module('impactApp')
  .directive('parallaxBackground', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@'
    },
    link: function($scope, elem) {
      var setPosition = function () {
        var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
        var topVal = $scope.parallaxVerticalOffset ? parseInt($scope.parallaxVerticalOffset, 10) + calcValY : calcValY;
        elem.css('background-position', '50% ' + topVal + 'px');
      };

      // set our initial position - fixes webkit background render bug
      angular.element($window).bind('load', function() {
        setPosition();
        $scope.$apply();
      });

      angular.element($window).bind('scroll', setPosition);
      angular.element($window).bind('touchmove', setPosition);
    }
  };
});
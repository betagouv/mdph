'use strict';

angular.module('impactApp')
  .directive('profileCard', function() {
    return {
      scope: {
        options: '='
      },
      templateUrl: 'components/profile-card/profile-card.html',
      restrict: 'EA',
      link: function(scope) {
        scope.title = scope.options.title;
        scope.subhead = scope.options.subhead;
        scope.content = scope.options.content;
        scope.icon = scope.options.icon;
        scope.open = false;

        scope.toggle = function() {
          scope.open = !scope.open;
        };
      }
    };
  });

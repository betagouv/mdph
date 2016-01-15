'use strict';

angular.module('impactApp')
  .directive('profileCategory', function($state) {
    return {
      scope: {
        options: '='
      },
      templateUrl: 'components/profile-category/profile-category.html',
      restrict: 'EA',
      link: function(scope) {
        scope.title = scope.options.title;
        scope.subhead = scope.options.subhead;
        scope.content = scope.options.content;
        scope.icon = scope.options.icon;
        scope.open = false;
        scope.action = scope.options.action;
        scope.profileClass = scope.options.class;

        scope.toggle = function() {
          scope.open = !scope.open;
        };

        scope.go = function() {
          $state.go(scope.action.sref);
        };
      }
    };
  });

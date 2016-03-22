'use strict';

angular.module('impactApp')
.directive('sublevel', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      question: '='
    },
    template: '<div></div>',
    link: function(scope, element) {
      if (scope.question.Reponses) {
        $compile('<trajectoire ng-if="question.isCollapsed" model="question.id" questions="question.Reponses" sublevel="true"></trajectoire>')(scope, function(cloned, scope) { // jshint ignore:line
          element.append(cloned);
        });
      }
    }
  };
});

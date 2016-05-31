'use strict';

angular.module('impactApp')
.directive('sublevel', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      question: '=',
      currentQuestionId: '=',
      root: '='
    },
    template: '<div></div>',
    link: function(scope, element) {
      if (scope.question.Reponses) {
        $compile('<trajectoire ng-if="currentQuestionId === question.id || question.isSelected" model="question.id" questions="question.Reponses" sublevel="true" current-question-id="currentQuestionId" root="root"></trajectoire>')(scope, function(cloned, scope) { // jshint ignore:line
          element.append(cloned);
        });
      }
    }
  };
});

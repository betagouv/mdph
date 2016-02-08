'use strict';

angular.module('impactApp')
  .directive('profileCategory', function($state) {
    return {
      scope: {
        options: '=',
        profile: '='
      },
      templateUrl: 'components/profile/profile-category.html',
      restrict: 'EA',
      link: function(scope) {

        function computeCompletion(section) {
          if (!section) {
            return 'empty';
          } else if (section.__completion) {
            return 'complete';
          } else {
            return 'half';
          }
        }

        function getActionLabel(completion) {
          switch (completion) {
            case 'empty':
              return 'Commencer';
            case 'complete':
              return 'Modifier';
            case 'half':
              return 'Reprendre';
          }
        }

        scope.title = scope.options.title;
        scope.subhead = scope.options.subhead;
        scope.content = scope.options.content;
        scope.icon = scope.options.icon;
        scope.open = false;

        scope.updatedAt = scope.options.updatedAt;
        scope.mandatory = scope.options.mandatory;

        var model = scope.options.model;
        var getModelProperty = _.property(model);
        var sectionModel = getModelProperty(scope.profile);

        scope.completion = computeCompletion(sectionModel);
        scope.updatedAt = sectionModel && sectionModel.updatedAt;

        scope.action = scope.options.action;
        scope.action.label = getActionLabel(scope.completion);

        scope.profileClass = (scope.options.mandatory && 'mandatory') + ' ' + scope.completion;

        scope.toggle = function() {
          scope.open = !scope.open;
        };

        scope.go = function() {
          $state.go(scope.action.sref);
        };

      }
    };
  });

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
            return 0;
          } else if (section.__completion) {
            return 100;
          } else {
            return 50;
          }
        }

        scope.title = scope.options.title;
        scope.subhead = scope.options.subhead;
        scope.content = scope.options.content;
        scope.icon = scope.options.icon;
        scope.open = false;
        scope.action = scope.options.action;
        scope.updatedAt = scope.options.updatedAt;
        scope.profileClass = scope.options.class;

        var model = scope.options.model;
        var getModelProperty = _.property(model);
        var sectionModel = getModelProperty(scope.profile);

        scope.completion = sectionModel && computeCompletion(sectionModel);
        scope.updatedAt = sectionModel && sectionModel.updatedAt;

        scope.toggle = function() {
          scope.open = !scope.open;
        };

        scope.go = function() {
          $state.go(scope.action.sref);
        };

      }
    };
  });

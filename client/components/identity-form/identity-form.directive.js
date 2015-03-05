'use strict';

angular.module('impactApp')
  .directive('identityForm', function (IdentiteService) {
    return {
      scope: {
        type: '=',
        section: '=',
        identite: '=',
        submit: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
      link: function(scope) {
        scope.desc = IdentiteService.getDesc(scope.type);
        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };
      }
    };
  });

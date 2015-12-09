'use strict';

angular.module('impactApp')
  .directive('identityForm', function(IdentiteService, typesVoies) {
    return {
      scope: {
        type: '=',
        section: '=',
        identite: '=',
        submit: '=',
        mdph: '=',
        id: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
      link: function(scope) {
        scope.typesVoies = typesVoies;
        scope.desc = IdentiteService.getDesc(scope.type);
        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };

        scope.disableAddress = function() {
          return (scope.identite.adresseInconnue ? true : false);
        };
      }
    };
  });

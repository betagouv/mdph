'use strict';

angular.module('impactApp')
  .directive('identityCard', function (IdentiteService) {
    return {
      scope: {
        type: '=',
        sectionModel: '=',
        currentId: '='
      },
      templateUrl: 'components/identity-card/identity-card.html',
      restrict: 'EA',
      link: function(scope) {
        scope.identite = IdentiteService.getIdentite(scope.type, scope.sectionModel, scope.currentId);
        scope.sref = IdentiteService.getSref(scope.type, scope.currentId);
        scope.title = IdentiteService.getTitle(scope.type);
      }
    };
  });

'use strict';

angular.module('impactApp')
  .directive('identityForm', function () {
    return {
      scope: {
        type: '=',
        section: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
      link: function(scope) {
        var getTitle = function(type) {
          switch (type) {
            case 'beneficiaire':
               return 'Identité de la personne concernée par la demande';
            default:
              return 'TODO';
          }
        };

        scope.title = getTitle(scope.type);
      }
    };
  });

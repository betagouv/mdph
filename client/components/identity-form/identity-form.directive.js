'use strict';

angular.module('impactApp')
  .directive('identityForm', function () {
    return {
      scope: {
        type: '=',
        section: '=',
        identite: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
      link: function(scope, $state) {
        var getTitle = function(type) {
          switch (type) {
            case 'beneficiaire':
               return 'Identité de la personne concernée par la demande';
            default:
              return 'TODO';
          }
        };

        scope.submit = function(form) {
          if (form.$invalid) {
            form.showError = true;
          } else {
            $state.go('^');
          }
        };

        scope.title = getTitle(scope.type);
      }
    };
  });

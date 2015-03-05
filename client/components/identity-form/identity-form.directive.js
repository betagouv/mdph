'use strict';

angular.module('impactApp')
  .directive('identityForm', function ($state) {
    return {
      scope: {
        type: '=',
        section: '=',
        identite: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
      link: function(scope) {
        var getTitle = function(type) {
          switch (type) {
            case 'beneficiaire':
               return 'Identité de la personne concernée par la demande';
            case 'autorite':
               return 'Identité de l\'autorité parentale du bénéficiaire';
            case 'aidantDemarche':
               return 'Identité de la personne vous aidant dans votre démarche';
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

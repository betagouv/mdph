'use strict';

angular.module('impactApp')
  .directive('identityForm', function () {
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

        scope.title = getTitle(scope.type);

        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };
      }
    };
  });

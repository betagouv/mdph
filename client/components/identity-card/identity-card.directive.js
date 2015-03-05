'use strict';

angular.module('impactApp')
  .directive('identityCard', function () {
    return {
      scope: {
        condition: '=',
        type: '=',
        parent: '=',
        sectionModel: '='
      },
      templateUrl: 'components/identity-card/identity-card.html',
      restrict: 'EA',
      link: function(scope) {
        var getSref = function(type) {
          switch (type) {
            case 'beneficiaire':
               return '.modification_identite({type: "beneficiaire"})';
            case 'autorite':
               return '.modification_identite({type: "autorite", parent: "'+ parent +'"})';
            case 'aidantDemarche':
               return '.modification_identite({type: "aidantDemarche"})';
            default:
              return 'TODO';
          }
        };

        var getTitle = function(type) {
          switch (type) {
            case 'beneficiaire':
               return 'Personne concernée par la demande';
            case 'autorite':
               return 'Autorité parentale';
            case 'aidantDemarche':
               return 'Personne qui vous aide';
            default:
              return 'TODO';
          }
        };
        scope.sref = getSref(scope.type);
        scope.title = getTitle(scope.type);
      }
    };
  });

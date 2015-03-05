'use strict';

angular.module('impactApp')
  .directive('identityCard', function () {
    return {
      scope: {
        type: '=',
        sectionModel: '=',
        currentId: '='
      },
      templateUrl: 'components/identity-card/identity-card.html',
      restrict: 'EA',
      link: function(scope) {

        var getIdentite = function(type, sectionModel, currentId) {
          switch (type) {
            case 'beneficiaire':
              return sectionModel.beneficiaire ? sectionModel.beneficiaire : {};
            case 'autorite':
              if (!sectionModel.autorite) {
                sectionModel.autorite = {};
              }

              if(!sectionModel.autorite[currentId]){
                sectionModel.autorite[currentId] = {};
              }
              return sectionModel.autorite[currentId];
            case 'aidantDemarche':
              if (!sectionModel.aidantDemarche) {
                sectionModel.aidantDemarche = [];
              }

              var aidant = sectionModel.aidantDemarche[currentId];
              if (!aidant) {
                aidant = {};
              }

              return aidant;
          }
        };

        var getSref = function(type) {
          switch (type) {
            case 'beneficiaire':
               return '.modification_identite({type: "beneficiaire"})';
            case 'autorite':
               return '.modification_identite({type: "autorite", id: "'+ scope.currentId +'"})';
            case 'aidantDemarche':
               return '.modification_identite({type: "aidantDemarche", id: "' + scope.currentId + '"})';
          }
        };

        var getTitle = function(type) {
          switch (type) {
            case 'beneficiaire':
               return 'Bénéficiaire';
            case 'autorite':
               return 'Autorité parentale';
            case 'aidantDemarche':
               return 'Personne qui vous aide';
          }
        };

        scope.identite = getIdentite(scope.type, scope.sectionModel, scope.currentId);
        scope.sref = getSref(scope.type);
        scope.title = getTitle(scope.type);
      }
    };
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.modification_identite', {
        url: '/:type?id',
        template: '<identity-form type="type" section="section" identite="identite"/>',
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },
          identite: function(sectionModel, type, $stateParams){
            switch (type) {
              case 'beneficiaire':
                if (!sectionModel.beneficiaire) {
                  sectionModel.beneficiaire = {};
                }
                return sectionModel.beneficiaire;
              case 'autorite':
                if (!sectionModel.autorite) {
                  sectionModel.autorite = {};
                }
                var currentId;

                if($stateParams.id) {
                  currentId = 'parent' + $stateParams.id;
                } else {
                  currentId = 'parent1';
                }

                if(!sectionModel.autorite[currentId]){
                  sectionModel.autorite[currentId] = {};
                }

                return sectionModel.autorite[currentId];
              case 'aidantDemarche':
                if (!sectionModel.aidantDemarche) {
                  sectionModel.aidantDemarche = [];
                }

                var aidant = sectionModel.aidantDemarche[$stateParams.id];
                if (aidant) {
                  return aidant;
                } else {
                  aidant = {};
                  sectionModel.aidantDemarche.push(aidant);
                }

                return aidant;
            }
          }
        },
        controller: function($scope, type, identite){
          $scope.identite = identite;
          $scope.type = type;
        }
      });
  });

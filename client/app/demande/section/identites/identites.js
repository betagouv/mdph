'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.modification_identite', {
        url: '/:type?id',
        template: '<identity-form type="type" submit="submit" section="section" identite="tempIdentite"/>',
        resolve: {
          submit: function($state, sectionModel, tempIdentite, type, currentId) {
            return function(form) {
              if (form.$invalid) {
                form.showError = true;
              } else {
                switch (type) {
                  case 'beneficiaire':
                    sectionModel.beneficiaire = tempIdentite;
                    break;
                  case 'autorite':
                    sectionModel.autorite[currentId] = tempIdentite;
                    break;
                  case 'aidantDemarche':
                    if (currentId === sectionModel.aidantDemarche.length) {
                      sectionModel.aidantDemarche.push(tempIdentite);
                    } else {
                      sectionModel.aidantDemarche[currentId] = tempIdentite;
                    }
                    break;
                }

                $state.go('^');
              }
            };
          },
          type: function($stateParams) {
            return $stateParams.type;
          },
          currentId: function($stateParams, type) {
            var id = $stateParams.id;
            if (!id && type === 'autorite') {
              return 'parent1';
            }
            return $stateParams.id;
          },
          identite: function(sectionModel, type, $stateParams, currentId){
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
                  sectionModel.aidantDemarche.push(aidant);
                }

                return aidant;
            }
          },
          tempIdentite: function(identite) {
            return _.clone(identite, true);
          }
        },
        controller: function($scope, type, tempIdentite, submit){
          $scope.tempIdentite = tempIdentite;
          $scope.type = type;
          $scope.submit = submit;
        }
      });
  });

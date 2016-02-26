'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil.demande', {
    url: '/demande/:shortId',
    authenticate: true,
    data: {
      title: 'Détail de la demande'
    },

    resolve: {
      shortId: function($stateParams) {
        return $stateParams.shortId;
      },

      request: function(RequestResource, shortId) {
        return RequestResource.get({shortId: shortId}).$promise;
      },

      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return result.data;
        });
      }
    },

    views: {
      '': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/demande.html',
        controller: function($scope, $state, $filter, toastr, RequestResource, ProfileService, RequestService, currentUser, request, profile, prestations) {
          $scope.request = request;
          $scope.currentUser = currentUser;

          if (request.prestations && request.prestations.length > 0) {
            _.map(request.prestations, function(prestation) {
              _.find(prestations, {id: prestation}).isSelected = true;
            });
          }

          function getSelectedPrestationIdList() {
            return _.chain(prestations)
             .filter({isSelected: true})
             .pluck('id')
             .value();
          }

          $scope.submit = function(form) {
            if (!form.$valid) {
              toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
            } else {
              request.prestations = getSelectedPrestationIdList();
              if (!RequestService.getCompletion(request)) {
                toastr.error('Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.', 'Erreur lors de la tentative d\'envoi');
              } else if (currentUser.unconfirmed) {
                toastr.error('Vous n\'avez pas confirmé votre compte ' + currentUser.email, 'Erreur lors de la tentative d\'envoi');
              } else if (request.prestations.length < 1) {
                toastr.error('Vous n\'avez pas demandé de prestation', 'Erreur lors de la tentative d\'envoi');
              } else {
                request.status = 'emise';
                request.$update({isSendingRequest: true}, function() {
                  $state.go('^', {}, {reload: true});
                });
              }
            }
          };
        }
      },
      'choix_mdph@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/choix_mdph/choix_mdph.html',
        controller: function($scope, mdphs, request, enabledMdphs) {
          $scope.request = request;
          $scope.selectedMdph = _.find(mdphs, {code_departement: request.mdph});
          $scope.mdphs = mdphs;
          $scope.enabledMdphs = enabledMdphs;

          $scope.resetOldMdph = function() {
            request.old_mdph = null;
            request.numeroDossier = null;
          };
        },

        resolve: {
          mdphs: function($http) {
            return $http.get('/api/mdphs/list').then(function(result) {
              return result.data;
            });
          },

          enabledMdphs: function(mdphs) {
            return _.filter(mdphs, {enabled: true});
          }
        }
      },
      'obligatoires@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/obligatoires.html',
        controller: 'DocumentsObligatoiresCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'obligatoires'}).$promise;
          }
        }
      },
      'complementaires@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/complementaires.html',
        controller: 'DocumentsComplementairesCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'complementaires'}).$promise;
          }
        }
      },
      'suggestions@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/suggestions.html',
        controller: function($scope, PreparationEvaluationService, request) {
          $scope.docsList = PreparationEvaluationService.getSuggestedDocsList(request.formAnswers);
        }
      },
      'prestations@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/prestations/prestations.html',
        controller: function($scope, prestations) {
          $scope.types = _.groupBy(prestations, 'type');
        }
      },
      'validation@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/validation/validation.html',
        controller: function($scope, RequestService, ProfileService, request, profile, currentUser) {
          $scope.currentUser = currentUser;

          $scope.isReadyToSend = function() {
            return ProfileService.getCompletion(profile) && RequestService.getCompletion(request) && !currentUser.unconfirmed;
          };

          $scope.getProfileCompletion = function() {
            return ProfileService.getCompletion(profile);
          };

          $scope.getDocumentsCompletion = function() {
            return RequestService.getCompletion(request);
          };
        }
      }
    }
  });
});

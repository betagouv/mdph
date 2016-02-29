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
          return _.map(result.data, function(element) {
            return _.extend({}, element, {choice: "false"});
          });
        });
      },
    },

    views: {
      '': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/demande.html',
        controller: function($scope, $state, $filter, toastr, RequestResource, ProfileService, RequestService, currentUser, request, profile, prestations) {
          $scope.request = request;
          $scope.currentUser = currentUser;

          if (request.prestations && request.prestations.length > 0) {
            _.map(request.prestations, function(prestation) {
              _.find(prestations, { id: prestation }).isSelected = true;
            });
          }

          function getSelectedPrestationIdList() {
            debugger;
            return _.chain(prestations)
             .filter({ choice: true })
             .pluck('id')
             .value();
          }

          function getRenewalPrestationIdList() {
            debugger;
            return _.chain(prestations)
             .filter({ choice: 'renouvellement' })
             .pluck('id')
             .value();
          }

          $scope.submit = function(form) {
            if (!form.$valid) {
              toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
            } else {
              request.prestations = getSelectedPrestationIdList();
              request.renouvellements = getRenewalPrestationIdList();
              if (!RequestService.getCompletion(request)) {
                toastr.error('Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.', 'Erreur lors de la tentative d\'envoi');
              } else if (currentUser.unconfirmed) {
                toastr.error('Vous n\'avez pas confirmé votre compte ' + currentUser.email, 'Erreur lors de la tentative d\'envoi');
              } else if (request.prestations.length < 1 && request.renouvellements.length < 1 ) {
                toastr.error('Vous n\'avez pas demandé de prestation', 'Erreur lors de la tentative d\'envoi');
              } else {
                request.status = 'emise';
                request.submittedAt = Date.now();
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
        controller: function($scope, enabledMdphs, mdphJSON, request, mdphParams) {
          $scope.enabledMdphs = enabledMdphs;
          $scope.selectedMdph = _.find(mdphJSON, {code_departement: request.mdph});
          $scope.request.mdph = mdphParams;
          $scope.request = request;

          $scope.resetOldMdph = function() {
            request.old_mdph = null;
            request.numeroDossier = null;
          };
        },

        resolve: {
          mdphJSON: function($http) {
            return $http.get('/api/mdphs/list').then(function(result) {
              return result.data;
            });
          },

          enabledMdphs: function(mdphJSON) {
            return _.filter(mdphJSON, {enabled: true});
          },

          mdphParams: function($stateParams) {
            return $stateParams.codeDepartement;
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

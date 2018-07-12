'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('demande.autre', {
        url: '/identite-autre',
        data: {
          title: 'Identité de la personne vous aidant dans cette démarche'
        },
        templateUrl: 'app/demande/identites/autre.html',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          identite: function(demande) {
            if (!demande.data.identites) {
              demande.data.identites = {};
            }

            if (!demande.data.identites.autre) {
              demande.data.identites.autre = {};
            }

            return demande.data.identites.autre;
          }
        },
        controller: function($scope, $state, RequestResource, demande, currentUser, currentMdph, identite, $window, AdressService) {
          $scope.identite = identite;
          $scope.currentMdph = currentMdph;
          $scope.getAdress = AdressService.getAdress;
          $scope.fillAdressOnSelect = AdressService.fillAdressOnSelect;

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              identite.__completion = true;
              identite.updatedAt = Date.now();
              demande.data.identites.autre = identite;
              RequestResource.update(demande).$promise.then(function() {
                if (demande.data.identites.beneficiaire.protection === 'true') {
                  $state.go('demande.representant');
                } else {
                  $state.go('demande.situations_particulieres');
                }
              });
            }
          };
        }
      });
  });

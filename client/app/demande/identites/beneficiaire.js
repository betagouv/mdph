'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('demande.beneficiaire', {
        url: '/identite-beneficiaire',
        data: {
          title: 'Identité du bénéficiaire'
        },
        templateUrl: 'app/demande/identites/beneficiaire.html',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          identite: function(demande) {
            if (!demande.data.identites) {
              demande.data.identites = {};
            }

            if (!demande.data.identites.beneficiaire) {
              demande.data.identites.beneficiaire = {};
            }

            return demande.data.identites.beneficiaire;
          }
        },

        controller: function($scope, $state, RequestResource, DemandeService, demande, currentUser, identite, $window, AdressService, currentMdph) {
          $scope.identite = identite;
          $scope.currentMdph = currentMdph;
          $scope.getAdress = AdressService.getAdress;
          $scope.fillAdressOnSelect = AdressService.fillAdressOnSelect;
          $scope.maskOptions = {clearOnBlur: false, allowInvalidValue: true};
          $scope.estAdulte = DemandeService.estAdulte(demande);
          $scope.estEnfant = DemandeService.estEnfant(demande);

          $scope.majAdulteEnfant = function() {
            $scope.estAdulte = DemandeService.estAdulte(demande);
            $scope.estEnfant = DemandeService.estEnfant(demande);
            if ($scope.estAdulte) {
              identite.numero_secu_enfant = '';
            }
          };

          if (!identite.email) {
            identite.email = currentUser.email;
          }

          if ($scope.identite.email === currentUser.email) {
            $scope.cbEmail = true;
          }

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              identite.__completion = true;
              identite.updatedAt = Date.now();
              demande.data.identites.beneficiaire = identite;
              RequestResource.update(demande).$promise.then(function() {
                if (demande.data.identites.beneficiaire.numero_secu_enfant) {
                  $state.go('^.autorite');
                } else {
                  if (demande.data.identites.beneficiaire.aide === 'true') {
                    $state.go('demande.autre');
                  } else {
                    if (demande.data.identites.beneficiaire.protection === 'true') {
                      $state.go('^.representant');
                    } else {
                      $state.go('demande.situations_particulieres');
                    }
                  }
                }
              });
            }
          };
        }
      });
  });


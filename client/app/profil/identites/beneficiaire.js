'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('profil.beneficiaire', {
        url: '/identite-beneficiaire',
        data: {
          title: 'Identité du bénéficiaire'
        },
        templateUrl: 'app/profil/identites/beneficiaire.html',
        resolve: {
          identite: function(profile) {
            if (!profile.identites) {
              profile.identites = {};
            }

            if (!profile.identites.beneficiaire) {
              profile.identites.beneficiaire = {};
            }

            return profile.identites.beneficiaire;
          }
        },

        controller: function($scope, $state, ProfileService, profile, currentUser, identite, $window, AdressService, currentMdph) {
          $scope.identite = identite;
          $scope.currentMdph = currentMdph;
          $scope.getAdress = AdressService.getAdress;
          $scope.fillAdressOnSelect = AdressService.fillAdressOnSelect;
          $scope.maskOptions = {clearOnBlur: false, allowInvalidValue: true};
          $scope.estAdulteStricte = ProfileService.estAdulteStricte(profile);
          $scope.estEnfant = ProfileService.estEnfant(profile);

          $scope.majAdulteEnfant = function() {
            $scope.estAdulteStricte = ProfileService.estAdulteStricte(profile);
            $scope.estEnfant = ProfileService.estEnfant(profile);
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
              profile.identites.beneficiaire = identite;
              profile.$save({userId: currentUser._id}, function() {
                if (profile.identites.beneficiaire.numero_secu_enfant) {
                  $state.go('^.autorite');
                } else {
                  $state.go('^.aidant');
                }
              });
            }
          };
        }
      });
  });


'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('profil.autre', {
        url: '/identite-autre',
        data: {
          title: 'Identité de la personne vous aidant dans cette démarche'
        },
        templateUrl: 'app/profil/identites/autre.html',
        resolve: {
          identite: function(profile) {
            if (!profile.identites) {
              profile.identites = {};
            }

            if (!profile.identites.autre) {
              profile.identites.autre = {};
            }

            return profile.identites.autre;
          }
        },
        controller: function($scope, $state, profile, currentUser, currentMdph, identite, $window, AdressService) {
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
              profile.identites.autre = identite;
              profile.$save({userId: currentUser._id}, function() {
                if (profile.identites.beneficiaire.protection === 'true') {
                  $state.go('profil.representant');
                } else {
                  $state.go('profil.situations_particulieres');
                }
              });
            }
          };
        }
      });
  });

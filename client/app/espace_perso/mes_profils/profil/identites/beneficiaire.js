'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.beneficiaire', {
        url: '/identite-beneficiaire',
        data: {
          title: 'Identité du bénéficiaire'
        },
        templateUrl: 'app/espace_perso/mes_profils/profil/identites/beneficiaire.html',
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
        controller: function($scope, $state, profile, currentUser, identite, $window, AdressService, currentMdph) {
          $scope.identite = identite;

          $scope.lat = currentMdph.coordinates.coordy;
          $scope.long = currentMdph.coordinates.coordx;

          $scope.getAdress = AdressService.getAdress;

          if ($scope.identite.email === currentUser.email) {
            $scope.cbEmail = true;
          }

          $scope.toggleCheckBoxEmail = function() {
            if ($scope.cbEmail) {
              $scope.identite.email = currentUser.email;
            } else {
              $scope.identite.email = '';
            }
          };

          $scope.fillAdressOnSelect = function(result) {
            $scope.identite.nomVoie = result.properties.name;
            $scope.identite.code_postal = result.properties.postcode;
            $scope.identite.localite = result.properties.city;
          };

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              identite.__completion = true;
              identite.updatedAt = Date.now();
              profile.identites.beneficiaire = identite;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('^', {}, {reload: true});
              });
            }
          };
        }
      });
  });

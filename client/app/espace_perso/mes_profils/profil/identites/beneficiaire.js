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
        controller: function($scope, $state, profile, currentUser, identite, typesVoies, $http, $window) {
          $scope.identite = identite;
          $scope.typesVoies = typesVoies;

          var lat;
          var long;

          $window.navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
          });

          $scope.getLocation = function(val) {
            return $http({
              method: 'GET',
              url: 'http://api-adresse.data.gouv.fr/search/',
              params: {
                q: val,
                lat: lat,
                long: long,
                limit: 8
              },
              ignoreInterceptor: true
            })
            .then(function(response) {
              return response.data.features;
            });

          };

          $scope.fillAdressOnSelect = function(result) {
            $scope.identite.numero_voie = result.properties.housenumber;
            $scope.identite.nomVoie = result.properties.street;
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

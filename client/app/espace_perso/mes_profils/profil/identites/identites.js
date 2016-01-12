'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.beneficiaire', {
        url: '/identite-beneficiaire',
        title: 'Identité du bénéficiaire',
        templateUrl: 'app/espace_perso/mes_profils/profil/identites/beneficiaire.html',
        resolve: {
          identite: function(profile) {
            if (!profile.identites) {
              profile.identites = {};
              profile.identites.beneficiaire = {};
            }

            return profile.identites.beneficiaire;
          }
        },
        controller: function($scope, $state, profile, currentUser, identite, typesVoies) {
          $scope.identite = identite;
          $scope.typesVoies = typesVoies;

          $scope.disableAddress = function() {
            return ($scope.identite.adresseInconnue ? true : false);
          };

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              profile.identites.beneficiaire = identite;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('^');
              });
            }
          };
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.autre', {
        url: '/identite-autre',
        data: {
          title: 'Identité de la personne vous aidant dans cette démarche'
        },
        templateUrl: 'app/espace_perso/mes_profils/profil/identites/autre.html',
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
        controller: function($scope, $state, profile, currentUser, identite, typesVoies) {
          $scope.identite = identite;
          $scope.typesVoies = typesVoies;

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              identite.__completion = true;
              identite.updatedAt = Date.now();
              profile.identites.autre = identite;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('^', {}, {reload: true});
              });
            }
          };
        }
      });
  });

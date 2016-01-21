'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.autorite', {
        url: '/identite-autorite',
        data: {
          title: 'Identité de l\'autorité parentale'
        },
        templateUrl: 'app/espace_perso/mes_profils/profil/identites/autorite.html',
        resolve: {
          identite: function(profile) {
            if (!profile.identites) {
              profile.identites = {};
            }

            if (!profile.identites.autorite) {
              profile.identites.autorite = {};
            }

            return profile.identites.autorite;
          }
        },
        controller: function($scope, $state, profile, currentUser, identite, typesVoies) {
          $scope.identite = identite;
          $scope.typesVoies = typesVoies;

          $scope.disableAddress = function() {
            return ($scope.identite && $scope.identite.adresseInconnue ? true : false);
          };

          $scope.submit = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              identite.__completion = true;
              profile.identites.autorite = identite;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('^', {}, {reload: true});
              });
            }
          };
        }
      });
  });

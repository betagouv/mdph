'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.autorite', {
        url: '/identite-autorite',
        data: {
          title: 'Identité de l\'autorité parentale'
        },
        views: {
          '': {
            templateUrl: 'app/espace_perso/mes_profils/profil/identites/autorites.html',
            controller: function($scope, $state, profile, currentUser, identite) {
              $scope.identite = identite;

              $scope.forms = {};

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  identite.__completion = true;
                  identite.updatedAt = Date.now();
                  profile.identites.autorite = identite;
                  profile.$save({userId: currentUser._id}, function() {
                    $state.go('^', {}, {reload: true});
                  });
                }
              };
            },

            resolve: {
              identite: function(profile) {
                if (!profile.identites) {
                  profile.identites = {};
                }

                if (!profile.identites.autorite) {
                  profile.identites.autorite = {};
                }

                if (!profile.identites.autorite.parent1) {
                  profile.identites.autorite.parent1 = {};
                }

                if (!profile.identites.autorite.parent2) {
                  profile.identites.autorite.parent2 = {};
                }

                return profile.identites.autorite;
              }
            }
          },
          'parent1@espace_perso.mes_profils.profil.autorite': {
            templateUrl: 'app/espace_perso/mes_profils/profil/identites/autorite.html',
            controller: 'AutoriteCtrl',

            resolve: {
              identite: function(profile) {
                return profile.identites.autorite.parent1;
              },

              id: function() {
                return '1';
              }
            }
          },
          'parent2@espace_perso.mes_profils.profil.autorite': {
            templateUrl: 'app/espace_perso/mes_profils/profil/identites/autorite.html',
            controller: 'AutoriteCtrl',

            resolve: {
              identite: function(profile) {
                return profile.identites.autorite.parent2;
              },

              id: function() {
                return '2';
              }
            }
          }
        }
      });
  });

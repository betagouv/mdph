'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('profil.autorite', {
        url: '/identite-autorite',
        data: {
          title: 'Identité de l\'autorité parentale',
          forms: {}
        },
        views: {
          '': {
            templateUrl: 'app/profil/identites/autorites.html',
            controller: function($scope, $state, profile, currentUser, identite) {
              $scope.identite = identite;

              $scope.forms = $state.current.data.forms;

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  identite.__completion = true;
                  identite.updatedAt = Date.now();
                  profile.identites.autorite = identite;
                  profile.$save({userId: currentUser._id}, function() {
                    $state.go('^.vie_quotidienne');
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
          'parent1@profil.autorite': {
            templateUrl: 'components/autorite-form/autorite.html',
            controller: 'AutoriteCtrl',

            resolve: {
              identite: function(profile) {
                return profile.identites.autorite.parent1;
              },

              id: function() {
                return '1';
              },

              required: function() {
                return true;
              }
            }
          },
          'parent2@profil.autorite': {
            templateUrl: 'components/autorite-form/autorite.html',
            controller: 'AutoriteCtrl',

            resolve: {
              identite: function(profile) {
                return profile.identites.autorite.parent2;
              },

              id: function() {
                return '2';
              },

              required: function() {
                return false;
              }
            }
          }
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('profil.representant', {
        url: '/identite-representant',
        data: {
          title: 'Identité de l\'autorité parentale',
          forms: {}
        },
        views: {
          '': {
            templateUrl: 'app/profil/identites/representants.html',
            controller: function($scope, $state, profile, currentUser, currentMdph, identite) {
              $scope.identite = identite;
              $scope.currentMdph = currentMdph;

              $scope.forms = $state.current.data.forms;

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  identite.__completion = true;
                  identite.updatedAt = Date.now();
                  profile.identites.representant = identite;
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

                if (!profile.identites.representant) {
                  profile.identites.representant = {};
                }

                if (!profile.identites.representant.representant1) {
                  profile.identites.representant.representant1 = {};
                }

                if (!profile.identites.representant.representant2) {
                  profile.identites.representant.representant2 = {};
                }

                return profile.identites.representant;
              }
            }
          }
        }
      });
  });

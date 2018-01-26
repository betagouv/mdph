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
            controller: function($scope, $state, profile, currentUser, currentMdph, identite) {
              $scope.identite = identite;
              $scope.currentMdph = currentMdph;

              $scope.forms = $state.current.data.forms;

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  identite.__completion = true;
                  identite.updatedAt = Date.now();
                  profile.identites.autorite = identite;
                  profile.$save({userId: currentUser._id}, function() {
                    if (profile.identites.beneficiaire.aide === 'true') {
                      $state.go('^.aidant');
                    } else {
                      if (profile.identites.beneficiaire.protection === 'Oui') {
                        $state.go('profil.representant');
                      } else {
                        $state.go('profil.situations_particulieres');
                      }
                    }
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
          }
        }
      });
  });

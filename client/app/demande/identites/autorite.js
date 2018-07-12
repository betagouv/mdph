'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('demande.autorite', {
        url: '/identite-autorite',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        data: {
          title: 'Identité de l\'autorité parentale',
          forms: {}
        },
        views: {
          '': {
            templateUrl: 'app/demande/identites/autorites.html',

            resolve: {
              identite: function(demande) {
                if (!demande.data.identites) {
                  demande.data.identites = {};
                }

                if (!demande.data.identites.autorite) {
                  demande.data.identites.autorite = {};
                }

                if (!demande.data.identites.autorite.parent1) {
                  demande.data.identites.autorite.parent1 = {};
                }

                if (!demande.data.identites.autorite.parent2) {
                  demande.data.identites.autorite.parent2 = {};
                }

                return demande.data.identites.autorite;
              }
            },

            controller: function($scope, $state, RequestResource, demande, currentUser, currentMdph, identite) {
              $scope.identite = identite;
              $scope.currentMdph = currentMdph;

              $scope.forms = $state.current.data.forms;

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  identite.__completion = true;
                  identite.updatedAt = Date.now();
                  demande.data.identites.autorite = identite;
                  RequestResource.update(demande).$promise.then(function() {
                    if (demande.data.identites.beneficiaire.aide === 'true') {
                      $state.go('demande.autre');
                    } else {
                      if (demande.data.identites.beneficiaire.protection === 'true') {
                        $state.go('demande.representant');
                      } else {
                        $state.go('demande.situations_particulieres');
                      }
                    }
                  });
                }
              };
            }
          }
        }
      });
  });

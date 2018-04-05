'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('demande.representant', {
        url: '/identite-representant',
        authenticate: true,
        authorized: ['user'],
        data: {
          title: 'Identité de l\'autorité parentale',
          forms: {}
        },
        views: {
          '': {
            templateUrl: 'app/demande/identites/representants.html',

            resolve: {
              representant: function(demande) {
                if (!demande.data.identites) {
                  demande.data.identites = {};
                }

                if (!demande.data.identites.representant) {
                  demande.data.identites.representant = {};
                }

                if (!demande.data.identites.representant.representant1) {
                  demande.data.identites.representant.representant1 = {};
                }

                if (!demande.data.identites.representant.representant2) {
                  demande.data.identites.representant.representant2 = {};
                }

                return demande.data.identites.representant;
              }
            },

            controller: function($scope, $state, RequestResource, demande, currentUser, currentMdph, representant) {
              $scope.representant = representant;
              $scope.currentMdph = currentMdph;

              $scope.forms = $state.current.data.forms;

              $scope.submit = function(form) {
                if (!form.$invalid) {
                  representant.__completion = true;
                  representant.updatedAt = Date.now();
                  demande.data.identites.representant = representant;
                  RequestResource.update(demande).$promise.then(function() {
                    $state.go('demande.situations_particulieres');
                  });
                }
              };
            }
          }
        }
      });
  });

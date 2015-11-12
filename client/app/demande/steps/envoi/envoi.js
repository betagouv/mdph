'use strict';

angular.module('impactApp')
  .config(function($stateProvider, allSteps) {
    $stateProvider
      .state('departement.demande.envoi', {
        url: '/envoi',
        authenticate: true,
        resolve: {
          step: function() {
            return _.find(allSteps, {id: 'envoi'});
          }
        },
        views: {
          '': {
            templateUrl: 'app/demande/steps/envoi/envoi.html',
            controller: 'EnvoiCtrl'
          },
          'login@departement.demande.envoi': {
            templateUrl: 'components/login/login.html',
            controller: 'LoginStepCtrl',
            resolve: {
              afterLogin: function($state, $rootScope, $window, request) {
                return function() {
                  $rootScope.$broadcast('saving', 'pending');
                  request.$save(function() {
                    $rootScope.$broadcast('saving', 'success');
                    $state.go('departement.demande.envoi', {shortId: request.shortId});
                  },

                  function(err) {
                    $rootScope.$broadcast('saving', 'error');
                    $window.alert(err.data.message);
                  });
                };
              }
            }
          },
          'en_cours@departement.demande.envoi': {
            templateUrl: 'app/demande/steps/envoi/en_cours/en_cours.html',
            controller: 'EnCoursCtrl',
            resolve: {
              prestations: function($http) {
                return $http.get('api/prestations').then(function(result) {
                  return result.data;
                });
              },

              prestationsQuitus: function($http, $stateParams) {
                return $http.get('api/requests/' + $stateParams.shortId + '/simulation').then(function(result) {
                  return result.data;
                });
              }
            }
          },
          'emise@departement.demande.envoi': {
            templateUrl: 'app/demande/steps/envoi/emise/emise.html'
          }
        }
      });
  });

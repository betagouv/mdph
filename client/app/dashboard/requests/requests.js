'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          },

          secteurs: function(SecteurResource) {
            return SecteurResource.query().$promise;
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser();
          },

          incomplete: function(RequestResource) {
            return RequestResource.query().$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.pending', {
        url: '/en_attente/:secteurId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          currentSecteur: function($http, $stateParams) {
            if ($stateParams.secteurId === 'autres') {
              return {_id: 'autres', name: 'Sans secteur'};
            }

            return $http.get('/api/secteurs/' + $stateParams.secteurId).then(function(result) {
              return result.data;
            });
          },

          requests: function($http, $stateParams) {
            var secteurId = $stateParams.secteurId;
            if (secteurId === 'en_cours') {
              return $http.get('/api/secteurs/autres/requests?status=en_cours').then(function(result) {
                return result.data;
              });
            } else {
              return $http.get('/api/secteurs/' + secteurId + '/requests').then(function(result) {
                return result.data;
              });
            }
          },

          user: function() {
            return null;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.user', {
        url: '/utilisateur/:userId/:banette',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          currentSecteur: function() {
            return null;
          },

          requests: function(RequestResource, currentUser, user, banette) {
            if (banette !== 'toutes') {
              return RequestResource.query({evaluator: user._id, status: banette}).$promise;
            } else {
              return RequestResource.query({evaluator: user._id}).$promise;
            }
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          banette: function($stateParams) {
            return $stateParams.banette;
          }
        },
        authenticate: true
      });
  });

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
        templateUrl: 'app/dashboard/requests/pending/pending.html',
        controller: 'PendingRequestsCtrl',
        resolve: {
          requests: function($http, $stateParams) {
            var secteurId = $stateParams.secteurId;
            if (secteurId === 'en_cours') {
              return $http.get('/api/secteurs/null/requests?status=en_cours').then(function(result) {
                return result.data;
              });
            } else {
              if (secteurId === 'autres') {
                secteurId = 'null';
              }

              return $http.get('/api/secteurs/' + secteurId + '/requests').then(function(result) {
                return result.data;
              });
            }
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.user', {
        url: '/utilisateur/:userId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, currentUser, user) {
            if (currentUser._id === user._id) {
              return RequestResource.query({evaluator: user._id, status: 'emise'}).$promise;
            }

            return RequestResource.query({evaluator: user._id}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return true;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.userArchive', {
        url: '/utilisateur/:userId/archive',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({evaluator: user._id, status: 'evaluation'}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return false;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.userIncomplete', {
        url: '/utilisateur/:userId/incomplete',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({evaluator: user._id, status: 'en_cours'}).$promise;
          },

          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          },

          showArchiveAction: function() {
            return false;
          }
        },
        authenticate: true
      });
  });

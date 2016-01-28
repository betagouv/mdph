'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          secteurs: function(MdphResource, currentMdph) {
            return MdphResource.querySecteurs({zipcode: currentMdph.zipcode}).$promise;
          },

          requestCountByStatus: function(MdphResource, currentMdph, currentUser) {
            return MdphResource.queryUserRequestsCount({zipcode: currentMdph.zipcode, controllerid: currentUser._id}).$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.bySecteur', {
        url: '/par_secteur/:secteurId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          secteurId: function($stateParams) {
            return $stateParams.secteurId;
          },

          currentSecteur: function($stateParams, MdphResource, currentMdph, secteurId) {
            if (secteurId === 'autres') {
              return {_id: 'autres', name: 'Sans secteur'};
            }

            return MdphResource.getSecteur({zipcode: currentMdph.zipcode, controllerid: secteurId}).$promise;
          },

          secteurs: function(MdphResource, currentMdph) {
            return MdphResource.querySecteurs({zipcode: currentMdph.zipcode}).$promise;
          },

          requests: function($stateParams, MdphResource, currentMdph, secteurId) {
            return MdphResource.queryRequestsForSecteur({zipcode: currentMdph.zipcode, controllerid: secteurId}).$promise;
          },

          user: function() {
            return null;
          },

          banette: function() {
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

          requests: function(MdphResource, currentUser, currentMdph, user, banette) {
            if (banette !== 'toutes') {
              return MdphResource.queryRequests({zipcode: currentMdph.zipcode, evaluator: user._id, status: banette}).$promise;
            } else {
              return MdphResource.queryRequests({zipcode: currentMdph.zipcode, evaluator: user._id}).$promise;
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

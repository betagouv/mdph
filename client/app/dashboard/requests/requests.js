'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          },
          currentUser: function(Auth) {
            return Auth.getCurrentUser();
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.list', {
        url: '/liste',
        abstract: true,
        template: '<ui-view></ui-view>',
        authenticate: true
      })
      .state('dashboard.requests.list.non_attribue', {
        url: '/non_attribue',
        templateUrl: 'app/dashboard/requests/non_attribue/non_attribue.html',
        controller: 'RequestNonAttribueCtrl',
        resolve: {
          requests: function(RequestResource) {
            return RequestResource.query({opened: true, evaluator: 'null'}).$promise;
          },
        },
        authenticate: true
      })
      .state('dashboard.requests.list.non_attribue.detail', {
        url: '/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: 'DetailDemandeCtrl',
        resolve: {
          request: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId).then(function(request) {
              return request.data;
            });
          }
        }
      })
      .state('dashboard.requests.list.user', {
        url: '/:userId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({opened: true, evaluator: user._id}).$promise;
          },
          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.list.user.detail', {
        url: '/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: 'DetailDemandeCtrl',
        resolve: {
          request: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId).then(function(request) {
              return request.data;
            });
          }
        }
      });
  });

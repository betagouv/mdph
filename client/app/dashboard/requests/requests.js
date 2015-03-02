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
          },
          pendingRequests: function($http) {
            return $http({method: 'HEAD', url: '/api/requests', params: {evaluator: 'null'}}).then(function(result) {
              return result.headers('count');
            });
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
            return RequestResource.query({evaluator: 'null'}).$promise;
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.list.user', {
        url: '/:userId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({evaluator: user._id}).$promise;
          },
          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail', {
        url: '/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: 'RequestDetailCtrl',
        resolve: {
          request: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId).then(function(request) {
              return request.data;
            });
          },
          sections: function(GevaService, request) {
            return GevaService.getSections(request);
          }
        }
      })
      .state('dashboard.requests.detail.section', {
        url: '/:sectionId',
        templateUrl: 'app/dashboard/requests/detail/section/section.html',
        controller: 'RequestSectionCtrl'
      });
  });

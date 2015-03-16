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
        controller: function($scope, $window, request, user) {
          $scope.request = request;
          $scope.user = user;

          $scope.back = function() {
            $window.history.back();
          };
        },
        resolve: {
          request: function($http, $stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          },
          user: function($http, request) {
            return $http.get('api/users/' + request.user).then(function(result) {
              return result.data;
            });
          },
          vieQuotidienne: function($http) {
            return $http.get('api/questions/vie_quotidienne').then(function(result) {
              return result.data;
            });
          }
        },
        abstract: true,
        authenticate: true
      })
      .state('dashboard.requests.detail.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/dashboard/requests/detail/pre_evaluation/pre_evaluation.html',
        controller: 'RequestPreEvaluationCtrl',
        resolve: {
          recapitulatif: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId + '/recapitulatif').then(function(request) {
              return request.data;
            });
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/requests/detail/evaluation/evaluation.html',
        controller: 'RequestEvaluationCtrl',
        resolve: {
          sections: function(GevaService, request) {
            return GevaService.getSections(request);
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation.section', {
        url: '/:sectionId',
        templateUrl: 'app/dashboard/requests/detail/evaluation/section/section.html',
        controller: 'RequestSectionCtrl',
        authenticate: true
      });
  });

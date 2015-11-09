'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail', {
        url: '/detail/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: function($scope, $state, $cookies, $window, request) {
          $scope.request = request;
          $scope.token = $cookies.get('token');

          $scope.back = function() {
            $window.history.back();
          };

          $scope.archive = function(request) {
            request.status = 'evaluation';
            request.$save(function() {
              $state.go('dashboard.requests.user', {userId: 'me'}, {reload: true});
            });
          };

          $scope.assigner = function() {
            request.evaluator = $scope.currentUser._id;
            request.$update();
          };

          $scope.supprimer = function(request) {
            request.$delete(function() {
              $state.go('dashboard.requests.user', {userId: 'me'}, {reload: true});
            });
          };
        },

        resolve: {
          request: function($http, $stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          },

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
        },
        abstract: true,
        authenticate: true
      })
      .state('dashboard.requests.detail.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/dashboard/requests/detail/pre_evaluation/pre_evaluation.html',
        controller: 'RequestPreEvaluationCtrl',
        authenticate: true
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.detail', {
        url: '/detail/:shortId',
        templateUrl: 'app/dashboard/workflow/detail/detail.html',
        controller: function($scope, $state, request) {
          $scope.request = request;

          $scope.archive = function(request) {
            request.status = 'archive';
            request.$save(function() {
              $state.go('dashboard.workflow', {status: 'archive'}, {reload: true});
            });
          };

          $scope.supprimer = function(request) {
            request.$delete(function() {
              $state.go('dashboard.workflow', {}, {reload: true});
            });
          };
        },

        resolve: {
          request: function($http, $stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          }
        },
        abstract: true,
        authenticate: true
      })
      .state('dashboard.workflow.detail.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/dashboard/workflow/detail/pre_evaluation/pre_evaluation.html',
        controller: 'RequestPreEvaluationCtrl',
        authenticate: true
      })
      .state('dashboard.workflow.detail.documents', {
        url: '/documents',
        templateUrl: 'app/dashboard/workflow/detail/documents/documents.html',
        authenticate: true
      })
      .state('dashboard.workflow.detail.comments', {
        url: '/comments',
        templateUrl: 'app/dashboard/workflow/detail/comments/comments.html',
        controller: 'RequestCommentsCtrl',
        authenticate: true
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.detail', {
        url: '/detail/:shortId',
        templateUrl: 'app/dashboard/workflow/detail/detail.html',
        controller: 'WorkflowDetailCtrl',

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
        controller: 'RequestDocumentsCtrl',
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

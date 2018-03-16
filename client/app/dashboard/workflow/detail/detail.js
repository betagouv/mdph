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
      .state('dashboard.workflow.detail.validation_depot', {
        url: '/validation_depot',
        templateUrl: 'app/dashboard/workflow/detail/validation_depot/validation_depot.html',
        controller: 'validationDepotCtrl',
        authenticate: true
      })
      .state('dashboard.workflow.detail.documents', {
        url: '/documents',
        controller: 'RequestDocumentsCtrl',
        templateUrl: 'app/dashboard/workflow/detail/documents/documents.html',
        authenticate: true,
        resolve: {
          documentTypes: function($http) {
            return $http.get('api/document-types').then(function(result) {
              return _.filter(result.data, function(documentType) {
                return !documentType.mandatory;
              });
            });
          }
        }
      })
      .state('dashboard.workflow.detail.comments', {
        url: '/comments',
        templateUrl: 'app/dashboard/workflow/detail/comments/comments.html',
        controller: 'RequestCommentsCtrl',
        authenticate: true
      });
  });

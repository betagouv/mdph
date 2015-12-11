'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.documents', {
        url: '/documents',
        redirectTo: 'dashboard.documents.list({type: \'obligatoires\'})',
        templateUrl: 'app/dashboard/documents/documents.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.documents.list', {
        url: '/:type',
        templateUrl: 'app/dashboard/documents/list/list.html',
        authenticate: true,
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },

          title: function(type) {
            return type === 'obligatoires' ? 'Documents obligatoires' : 'Documents complémentaires';
          },

          documentTypess: function(DocumentResource, type) {
            return DocumentResource.query({type: type}).$promise;
          }
        },
        controller: function($scope, type, documentTypess, title) {
          $scope.title = title;
          $scope.documentTypess = documentTypess;
        }
      });
  });

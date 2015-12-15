'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.documents', {
        url: '/documents',
        redirectTo: {
          url: 'dashboard.documents.list',
          params: {
            type: 'obligatoires'
          }
        },
        templateUrl: 'app/dashboard/documents/documents.html',
        authenticate: true
      })
      .state('dashboard.documents.categories', {
        url: '/categories',
        templateUrl: 'app/dashboard/documents/categories/categories.html',
        authenticate: true,
        resolve: {
          categories: function(MdphResource, currentMdph) {
            return MdphResource.queryDocumentCategories({zipcode: currentMdph.zipcode}).$promise;
          }
        },
        controller: 'CategoriesCtrl'
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

          documentTypes: function(DocumentResource, type) {
            return DocumentResource.query({type: type}).$promise;
          }
        },
        controller: function($scope, type, documentTypes, title) {
          $scope.title = title;
          $scope.documentTypes = documentTypes;
        }
      });
  });

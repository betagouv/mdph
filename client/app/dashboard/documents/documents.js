'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.documents', {
        url: '/documents',
        templateUrl: 'app/dashboard/documents/documents.html',
        authenticate: true,
        resolve: {
          unclassifiedCategory: function(DocumentCategoryResource, currentMdph) {
            return DocumentCategoryResource.getUnclassifiedDocumentCategory({mdphId: currentMdph._id}).$promise;
          },

          categories: function(DocumentCategoryResource, currentMdph) {
            return DocumentCategoryResource.queryDocumentCategories({mdphId: currentMdph._id}).$promise;
          },

          documentTypes: function($http, currentMdph) {
            return $http.get('api/mdphs/' + currentMdph.zipcode + '/document-types').then(function(result) {
              return result.data;
            });
          }
        },
        controller: 'DocumentCategoriesCtrl'
      });
  });

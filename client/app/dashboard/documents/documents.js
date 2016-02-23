'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.documents', {
        url: '/documents',
        redirectTo: 'dashboard.documents.categories',
        templateUrl: 'app/dashboard/documents/documents.html',
        authenticate: true
      })
      .state('dashboard.documents.categories', {
        url: '/categories',
        templateUrl: 'app/dashboard/documents/categories/categories.html',
        authenticate: true,
        resolve: {
          unclassifiedCategory: function(MdphResource, currentMdph) {
            return MdphResource.getUnclassifiedDocumentCategory({zipcode: currentMdph.zipcode}).$promise;
          },

          categories: function(MdphResource, currentMdph) {
            return MdphResource.queryDocumentCategories({zipcode: currentMdph.zipcode}).$promise;
          },

          documentTypes: function($http, currentMdph) {
            return $http.get('api/mdphs/' + currentMdph.zipcode + '/document-types').then(function(result) {
              return result.data;
            });
          }
        },
        controller: 'CategoriesCtrl'
      });
  });

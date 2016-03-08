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
            return DocumentCategoryResource.getUnclassifiedDocumentCategory({zipcode: currentMdph.zipcode}).$promise;
          },

          categories: function(DocumentCategoryResource, currentMdph) {
            return DocumentCategoryResource.query({zipcode: currentMdph.zipcode}).$promise;
          },

          documentTypes: function(MdphDocumentTypeResource, currentMdph) {
            return MdphDocumentTypeResource.query({zipcode: currentMdph.zipcode}).$promise;
          }
        },
        controller: 'DocumentCategoriesCtrl'
      });
  });

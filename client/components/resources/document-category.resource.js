'use strict';

angular.module('impactApp')
  .factory('DocumentCategoryResource', function($resource) {
    return $resource('/api/mdphs/:zipcode/categories/:categoryId/:controller/:controllerId',
      {
        categoryId: '@_id',
        zipcode: '@mdph.zipcode',
      },
      {
        getUnclassifiedDocumentCategory: {
          method: 'GET',
          params: {
            categoryId: 'unclassifiedCategory'
          }
        },
        getUncategorizedDocumentTypes: {
          method: 'GET',
          params: {
            categoryId: 'document-types'
          }
        }
      });
  });

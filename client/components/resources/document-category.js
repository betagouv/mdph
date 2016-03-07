'use strict';

angular.module('impactApp')
  .factory('DocumentCategoryResource', function($resource) {
    return $resource('/api/mdphs/:mdphId/categories/:categoryId/:controller/:controllerId',
      {
        categoryId: '@_id',
        mdphId: '@mdph._id',
      },
      {
        removeDocumentType: {
          method: 'DELETE',
          controller: 'document-type'
        },
        updateDocumentType: {
          method: 'POST',
          controller: 'document-type'
        }
      });
  });

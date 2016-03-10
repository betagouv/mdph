'use strict';

angular.module('impactApp')
  .factory('DocumentTypeResource', function($resource) {
    return $resource('/api/document-types/:id', {
      id: '@_id'
    });
  })
  .factory('MdphDocumentTypeResource', function($resource) {
    return $resource('/api/mdphs/:zipcode/categories/document-types');
  });

'use strict';

angular.module('impactApp')
  .factory('DocumentResource', function($resource) {
    return $resource('/api/documents/:id', {
      id: '@_id'
    });
  });

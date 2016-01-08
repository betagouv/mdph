'use strict';

angular.module('impactApp')
  .factory('SecteurResource', function($resource) {
    return $resource('/api/secteurs/:id', {
      id: '@_id'
    });
  });

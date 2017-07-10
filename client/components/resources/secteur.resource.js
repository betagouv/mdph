'use strict';

angular.module('impactApp')
  .factory('SecteurResource', function($resource) {
    return $resource('/api/mdphs/:mdph/secteurs/:id', {
      id: '@_id'
    });
  });

'use strict';

angular.module('impactApp')
  .factory('Partenaire', function ($resource) {
    return $resource('/api/partenaires/:id', {
      id: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

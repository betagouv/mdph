'use strict';

angular.module('impactApp')
  .factory('Mdph', function ($resource) {
    return $resource('/api/mdphs/:id/:controller', {
      id: '@_id'
    },
    {
      query: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'users'
        }
      }
    });
  });

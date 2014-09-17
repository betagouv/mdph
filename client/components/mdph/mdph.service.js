'use strict';

angular.module('impactApp')
  .factory('Mdph', function ($resource) {
    return $resource('/api/mdphs/:id/:controller', {
      id: '@_id'
    },
    {
      queryAll: {
        method: 'GET',
        isArray: true
      }
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

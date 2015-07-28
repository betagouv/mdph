'use strict';

angular.module('impactApp')
  .factory('Mdph', function($resource) {
    return $resource('/api/mdphs/:zipcode/:controller', {
      zipcode: '@zipcode'
    },
    {
      queryUsers: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'users'
        }
      }
    });
  });

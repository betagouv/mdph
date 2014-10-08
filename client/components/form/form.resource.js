'use strict';

angular.module('impactApp')
  .factory('FormResource', function ($resource) {
    return $resource('/api/requests/:id/:controller', {
      id: '@_id'
    },
    {
      getMine: {
        method: 'GET',
        params: {
          id: 'mine'
        }
      },
      updateStep: {
        method: 'PUT',
        params: {
          controller: 'step'
        }
      }
    });
  });

'use strict';

angular.module('impactApp')
  .factory('RequestResource', function ($resource) {
    return $resource('/api/requests/:id/:controller', {
      id: '@_id'
    },
    {
      updateStep: {
        method: 'PUT',
        params: {
          controller: 'step'
        }
      }
    });
  });

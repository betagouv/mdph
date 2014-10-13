'use strict';

angular.module('impactApp')
  .factory('FormResource', function ($resource) {
    return $resource('/api/user/:id/requests/:id/:controller', {
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

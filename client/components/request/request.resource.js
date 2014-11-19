'use strict';

angular.module('impactApp')
  .factory('RequestResource', function ($resource) {
    return $resource('/api/requests/:shortId/:controller', {
      shortId: '@shortId'
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

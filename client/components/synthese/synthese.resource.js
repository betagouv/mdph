'use strict';

angular.module('impactApp')
  .factory('SyntheseResource', function($resource) {
    return $resource('/api/requests/:shortId/syntheses/:syntheseId', {
      syntheseId: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

'use strict';

angular.module('impactApp')
  .factory('SyntheseResource', function($resource) {
    return $resource('/api/users/:userId/profiles/:profileId/syntheses/:syntheseId', {
      syntheseId: '@syntheseId'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

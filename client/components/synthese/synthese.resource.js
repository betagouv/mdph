'use strict';

angular.module('impactApp')
  .factory('SyntheseResource', function($resource) {
    return $resource('/api/syntheses/:shortId', {
      shortId: '@shortId'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

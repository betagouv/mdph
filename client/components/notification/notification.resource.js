'use strict';

angular.module('impactApp')
  .factory('Notification', function($resource) {
    return $resource('/api/notification/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

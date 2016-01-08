'use strict';

angular.module('impactApp')
  .factory('ProfileResource', function($resource) {
    return $resource('/api/users/:userId/profiles/:id', {
      id: '@_id'
    });
  });

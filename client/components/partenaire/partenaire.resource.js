'use strict';

angular.module('impactApp')
  .factory('Partenaire', function ($resource) {
    return $resource('/api/partenaires/:email', {
      email: '@email'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  });

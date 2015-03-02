'use strict';

angular.module('impactApp')
  .factory('RequestResource', function ($resource) {
    return $resource('/api/requests/:shortId/:controller', {
      shortId: '@shortId'
    },
    {
      update: {
        method: 'PUT'
      },
      getPartenaire: {
        method: 'GET',
        params: {
          controller: 'partenaire'
        }
      }
    });
  });

'use strict';

angular.module('impactApp')
  .factory('User', function($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      changeInfo: {
        method: 'PUT'
      },
      search: {
        method: 'GET',
        params: {
          id: 'search'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      queryRequests: {
        method: 'GET',
        params: {
          id: 'me',
          controller: 'requests'
        },
        isArray: true
      },
      generateToken: {
        method: 'POST',
        params: {
          id: 'generate_token'
        }
      }
    });
  });

'use strict';

angular.module('impactApp')
  .factory('MdphResource', function($resource) {
    return $resource('/api/mdphs/:zipcode/:controller/:controllerid/:subcontroller', {
      zipcode: '@zipcode'
    },
    {
      queryUsers: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'users'
        }
      },

      queryPartenaires: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'partenaires'
        }
      },

      querySecteurs: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'secteurs'
        }
      },

      getSecteur: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'secteurs'
        }
      },
      queryRequestsForSecteur: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'secteurs',
          subcontroller:'requests'
        }
      },
      queryRequests: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'requests'
        }
      }
    });
  });

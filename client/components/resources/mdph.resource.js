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
      },

      queryTotalRequestsCount: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'requests',
          controllerid: 'byStatus'
        }
      },

      queryUserRequestsCount: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'requests',
          subcontroller: 'byStatus'
        }
      },

      queryDocumentCategories: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'categories'
        }
      },

      getPdfDocumentCategory: {
        method: 'GET',
        params: {
          controller:'categories',
          controllerid: 'pdfCategory'
        }
      },

      getUnclassifiedDocumentCategory: {
        method: 'GET',
        params: {
          controller:'categories',
          controllerid: 'unclassifiedCategory'
        }
      }
    });
  });

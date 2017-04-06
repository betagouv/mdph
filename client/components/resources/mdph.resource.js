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

      querySecteursList: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'secteurs',
          controllerid: 'list'
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

      queryBeneficiaires: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'beneficiaires'
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

      queryDocumentCategories: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'categories'
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

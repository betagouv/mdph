'use strict';

angular.module('impactApp')
  .factory('MdphResource', function($resource) {
    return $resource('/api/mdphs/:zipcode/:controller/:controllerid/:subcontroller', {
      zipcode: '@zipcode'
    },
    {
      save: {
        method: 'POST',
        params: {
          zipcode:undefined
        }
      },

      update: {
        method: 'PUT'
      },

      updateRequestExportFormat: {
        method: 'PUT',
        params: {
          controller:'requestExportFormat'
        }
      },

      queryUsers: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'users'
        }
      },

      queryUsersHistory: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'users',
          controllerid: 'history'
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
      },

      getLogo: {
        method: 'GET',
        params: {
          controller:'logo'
        },
        headers: {
          accept: 'image/jpeg'
        },
        responseType: 'arraybuffer',
        cache: false,
        transformResponse: function(data) {
          return { data: data };
        }
      }
    });
  });

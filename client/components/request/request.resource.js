'use strict';

angular.module('impactApp')
  .factory('RequestResource', function($resource) {
    return $resource('/api/requests/:shortId/:controller/:target', {
      shortId: '@shortId'
    },
    {
      update: {
        method: 'PUT'
      },
      transfer: {
        method: 'POST',
        params: {
          controller: 'transfer'
        }
      },
      action: {
        method: 'POST',
        params: {
          controller: 'action'
        }
      },
      getPartenaire: {
        method: 'GET',
        params: {
          controller: 'partenaire'
        }
      },
      updateLinkedEvaluators: {
        method: 'POST',
        params: {
          controller: 'evaluateurs'
        }
      }
    });
  });

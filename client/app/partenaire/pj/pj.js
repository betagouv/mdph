'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('partenaire.pj', {
        url: '/:shortId/:partenaireId/:type',
        templateUrl: 'app/partenaire/pj/pj.html',
        controller: 'PieceJointeCtrl',
        resolve: {
          request: function($stateParams, RequestResource) {
            return RequestResource.getPartenaire({shortId: $stateParams.shortId}).$promise;
          },

          documentTypes: function($stateParams, DocumentResource) {
            var type = $stateParams.type;
            if (type === 'complementaires') {
              return DocumentResource.query({type: type}).$promise;
            } else {
              return DocumentResource.get({id: type}).$promise.then(function(result) {
                return [result];
              });
            }
          },

          partenaire: function($stateParams, Partenaire) {
            return Partenaire.get({id: $stateParams.partenaireId}).$promise;
          }
        }
      });
  });

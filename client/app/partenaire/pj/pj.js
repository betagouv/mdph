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

          documentTypes: function($stateParams, DocumentTypeResource) {
            var type = $stateParams.type;
            if (type === 'complementaires') {
              return DocumentTypeResource.query({type: type}).$promise;
            } else {
              return DocumentTypeResource.get({id: type}).$promise.then(function(result) {
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

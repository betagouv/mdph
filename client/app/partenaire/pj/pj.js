'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partenaire.pj', {
        url: '/:shortId/:partenaireId/:type',
        templateUrl: 'app/partenaire/pj/pj.html',
        controller: 'PieceJointeCtrl',
        resolve: {
          request: function($stateParams, RequestResource) {
            return RequestResource.getPartenaire({shortId: $stateParams.shortId}).$promise;
          },
          mdph: function(request, Mdph) {
            return Mdph.get({zipcode: request.mdph});
          },
          type: function($stateParams) {
            return $stateParams.type;
          },
          partenaire: function($stateParams, Partenaire) {
            return Partenaire.get({id: $stateParams.partenaireId}).$promise;
          }
        }
      });
  });

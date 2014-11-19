'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande', {
        url: '/:shortId',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        authenticate: true,
        resolve: {
          currentRequest: function($stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          }
        }
      });
  });

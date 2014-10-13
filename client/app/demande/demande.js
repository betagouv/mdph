'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande', {
        url: '/:id',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        authenticate: true,
        resolve: {
          request:  function(RequestResource, $stateParams) {
            return RequestResource.get({id: $stateParams.id}).$promise;
          }
        }
      });
  });

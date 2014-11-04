'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/demande/recapitulatif/recapitulatif.html',
        controller: 'RecapitulatifCtrl',
        resolve: {
          prestations: function($http) {
            return $http.get('/api/prestations').then(function(prestations) {
              return prestations.data;
            });
          }
        },
        authenticate: true
      });
  });

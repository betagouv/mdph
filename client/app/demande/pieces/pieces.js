'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.complementaire', {
        url: '/complementaire',
        templateUrl: 'app/demande/pieces/pieces.html',
        controller: 'PiecesCtrl',
        resolve: {
          step: function() {
            return { name: 'complementaire', id: 2};
          }
        },
        authenticate: true
      })
      .state('liste_demandes.demande.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/demande/pieces/pieces.html',
        controller: 'PiecesCtrl',
        resolve: {
          step: function() {
            return { name: 'obligatoire', id: 1};
          }
        },
        authenticate: true
      });
  });

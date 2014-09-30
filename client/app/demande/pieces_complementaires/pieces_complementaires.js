'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.pieces_complementaires', {
        url: '/pieces_complementaires',
        templateUrl: 'app/demande/pieces_complementaires/pieces_complementaires.html',
        controller: 'PiecesComplementairesCtrl',
        authenticate: true
      });
  });

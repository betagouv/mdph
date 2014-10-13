'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/demande/pieces_obligatoires/pieces_obligatoires.html',
        controller: 'PiecesObligatoiresCtrl',
        authenticate: true
      });
  });

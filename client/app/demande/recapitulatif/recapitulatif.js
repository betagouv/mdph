'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('espace_perso.liste_demandes.demande.recapitulatif', {
        url: '/recapitulatif',
        templateUrl: 'app/demande/recapitulatif/recapitulatif.html',
        controller: 'RecapitulatifCtrl',
        authenticate: true
      });
  });

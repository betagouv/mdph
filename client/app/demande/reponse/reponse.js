'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.reponse', {
        url: '/reponse',
        templateUrl: 'app/demande/reponse/reponse.html'
      });
  });

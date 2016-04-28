'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil.demande.recapitulatif', {
    url: '/recapitulatif',
    authenticate: true,
    data: {
      title: 'Récapitulatif de la demande'
    },

    templateUrl: 'app/profil/demande/recapitulatif/recapitulatif.html',

    controller: 'RecapitulatifCtrl'
  });
});

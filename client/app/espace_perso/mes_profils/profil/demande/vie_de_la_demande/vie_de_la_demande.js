'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mes_profils.profil.demande.vie_de_la_demande', {
        url: '/vie_de_la_demande',
        templateUrl: 'app/dashboard/workflow/detail/history/history.html',
        controller: 'RequestHistoryCtrl',
        authenticate: true
      });
  });

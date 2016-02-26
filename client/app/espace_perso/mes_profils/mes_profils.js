'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('mes_profils', {
    url: '/mes_profils',
    parent: 'espace_perso',
    templateUrl: 'app/espace_perso/mes_profils/mes_profils.html',
    controller: 'MesProfilsCtrl',
    authenticate: true,
    data: {
      title: 'Mes profils'
    }
  });
});

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.mon_compte', {
        url: '/',
        templateUrl: 'app/espace_perso/mon_compte/mon_compte.html',
        controller: 'MonCompteCtrl',
        authenticate: true,
        data: {
          title: 'Mon compte'
        }
      })
      .state('dashboard.espace_perso.mon_compte', {
        url: '/',
        templateUrl: 'app/espace_perso/mon_compte/mon_compte.html',
        controller: 'MonCompteCtrl',
        authenticate: true,
        data: {
          title: 'Mon compte'
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('gestion', {
        parent: 'layout',
        url: '',
        authenticate: true,
        authorized: ['user'],
        template: '<ui-view />',
        redirectTo: 'gestion_profil'
      });
  });

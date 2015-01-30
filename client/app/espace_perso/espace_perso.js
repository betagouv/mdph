'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('espace_perso', {
        url: '/espace_perso',
        templateUrl: 'app/espace_perso/espace_perso.html',
        controller: 'EspacePersoCtrl',
        authenticate: true
      });
  });

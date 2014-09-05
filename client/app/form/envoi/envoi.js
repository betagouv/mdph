'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('form.envoi', {
        url: '/envoi',
        templateUrl: 'app/form/envoi/envoi.html',
        controller: 'EnvoiCtrl'
      });
  });

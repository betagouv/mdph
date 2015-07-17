'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande.complementaires', {
        url: '/complementaires',
        templateUrl: 'app/demande/steps/complementaires/complementaires.html'
      })
      .state('departement.demande.complements', {
        url: '/complements',
        templateUrl: 'app/demande/steps/complements/complements.html'
      })
      .state('departement.demande.documents_lies', {
        url: '/documents_lies',
        templateUrl: 'app/demande/steps/documents_lies/documents_lies.html'
      });
  });

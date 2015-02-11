'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.partenaires', {
        url: '/partenaires',
        templateUrl: 'app/dashboard/partenaires/partenaires.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.partenaires.list', {
        url: '/:status',
        templateUrl: 'app/dashboard/partenaires/list/list.html',
        controller: 'PartenairesListCtrl',
        resolve: {
          partenaires: function($stateParams, Partenaire) {
            return Partenaire.query({status: $stateParams.status});
          },
          title: function($stateParams) {
            switch ($stateParams.status) {
              case 'certifie':
                return 'Certifiés';
              case 'refuse':
                return 'Refusés';
              default:
                return 'En attente';
            }
          }
        },
        authenticate: true
      })
      .state('dashboard.partenaires.list.edit', {
        url: '/:email',
        templateUrl: 'app/dashboard/partenaires/list/edit/edit.html',
        controller: 'PartenairesEditCtrl',
        resolve: {
          partenaire: function($stateParams, Partenaire) {
            return Partenaire.get({email: $stateParams.email});
          }
        },
        authenticate: true
      });
  });

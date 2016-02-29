'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('partenaire', {
        url: '/partenaire',
        parent: 'departement',
        templateUrl: 'app/partenaire/partenaire.html',
        controller: 'PartenaireCtrl',
        resolve: {
          type: function() {
            return 'complementaires';
          }
        }
      })
      .state('partenaire.mail_valide', {
        url: '/mail_valide',
        templateUrl: 'app/partenaire/mail_valide.html'
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
  var index = 'departement.questionnaire.renouvellement';
  $stateProvider
    .state(index + '.evolution', {
      url: '/evolution',
      templateUrl: 'components/question/radio.html',
      controller: 'EvolutionCtrl'
    })
    .state(index + '.liste_droits', {
      url: '/liste_droits',
      templateUrl: 'components/question/droits.html',
      controller: 'ListeDroitsCtrl',
      resolve: {
        prestations: function($http) {
          return $http.get('/api/prestations').then(function(prestations) {
            return prestations.data;
          });
        }
      }
    });
  });

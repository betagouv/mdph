'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('demande.prestations', {
    url: '/prestations',
    templateUrl: 'app/demande/prestations/prestations.html',
    controller: 'DemandePrestationsCtrl',
    controllerAs: 'demandePrestationsCtrl',
    authenticate: true,
    authorized: ['user'],
    resolve: {
      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return result.data;
        });
      },
    }
  });
});

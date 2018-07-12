'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('demande.prestations', {
    url: '/prestations',
    templateUrl: 'app/demande/prestations/prestations.html',
    controller: 'DemandePrestationsCtrl',
    controllerAs: 'demandePrestationsCtrl',
    authenticate: true,
    authorized: ['user'],
    protected: true,
    resolve: {
      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return _.reduce(result.data, function(accumulator, value) {
            accumulator[value.id] = value;
            return accumulator;
          }, {});
        });
      },
    }
  });
});

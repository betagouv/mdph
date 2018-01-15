'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil.prestations', {
    url: '/prestations',
    authenticate: true,
    templateUrl: 'app/profil/prestations/prestations.html',
    controller: 'PrestationsCtrl',
    controllerAs: 'prestationsCtrl',
    resolve: {
      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return result.data;
        });
      },
    }
  });
});

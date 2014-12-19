'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail', {
        url: '/:shortId',
        templateUrl: 'app/dashboard/repartition_demandes/detail/detail.html',
        controller: 'DetailDemandeCtrl',
        resolve: {
          request: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId).then(function(request) {
              return request.data;
            });
          },
          prestations: function($http) {
            return $http.get('/api/prestations').then(function(prestations) {
              return prestations.data;
            });
          }
        }
      });
  });

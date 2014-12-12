'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes', {
        url: '/repartition_demandes',
        templateUrl: 'app/dashboard/repartition_demandes/repartition_demandes.html',
        controller: 'RepartitionDemandesCtrl',
        resolve: {
          requests: function(RequestResource) {
            return RequestResource.query({opened: true}).$promise;
          }
        },
        authenticate: true
      });
  });

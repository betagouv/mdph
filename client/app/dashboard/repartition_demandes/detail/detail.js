'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail', {
        url: '/:shortId',
        templateUrl: 'app/dashboard/repartition_demandes/detail/detail.html',
        controller: 'DetailDemandeCtrl',
        resolve: {
          request: function(RequestResource, $stateParams) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          }
        }
      });
  });

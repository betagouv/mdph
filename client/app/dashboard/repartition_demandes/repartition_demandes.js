'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes', {
        url: '/mes_demandes',
        templateUrl: 'app/dashboard/repartition_demandes/repartition_demandes.html',
        controller: 'RepartitionDemandesCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.getCurrentUser();
          },
          userRequests: function(RequestResource, user) {
            return RequestResource.query({opened: true, evaluator: user._id}).$promise;
          }
        },
        authenticate: true
      })
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

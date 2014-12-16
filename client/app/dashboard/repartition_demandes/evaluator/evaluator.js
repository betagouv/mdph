'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.evaluateur', {
        url: '/:id',
        templateUrl: 'app/dashboard/repartition_demandes/evaluator/evaluator.html',
        controller: 'EvaluatorCtrl',
        resolve: {
          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.id).then(function(user) {
              return user.data;
            });
          },
          userRequests: function(RequestResource, $stateParams) {
            return RequestResource.query({opened: true, hasevaluator: $stateParams.id}).$promise;
          }
        },
        authenticate: true
      });
  });

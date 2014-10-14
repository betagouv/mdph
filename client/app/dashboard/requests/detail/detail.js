'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail', {
        url: '/:id',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: 'DetailCtrl',
        resolve: {
          request: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.id).then(function(request) {
              return request.data;
            });
          }
        }
      });
  });

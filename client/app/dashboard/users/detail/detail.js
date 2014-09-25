'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users.detail', {
        url: '/:id',
        templateUrl: 'app/dashboard/users/detail/detail.html',
        controller: 'DetailUserCtrl',
        resolve: {
          user: function($http, $stateParams) {
            return $http.get('/api/users/' + $stateParams.id).then(function(user) {
              return user.data;
            });
          }
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.list', {
        url: '/:userId',
        templateUrl: 'app/dashboard/requests/list/list.html',
        controller: 'RequestListCtrl',
        resolve: {
          requests: function(RequestResource, user) {
            return RequestResource.query({opened: true, evaluator: user._id}).$promise;
          },
          user: function($http, $stateParams) {
            if ($stateParams.userId === 'non_attribue') {
              return {name : 'Non attribuées', _id: 'null'};
            }
            return $http.get('/api/users/' + $stateParams.userId).then(function(user) {
              return user.data;
            });
          }
        },
        authenticate: true
      })
      ;
  });

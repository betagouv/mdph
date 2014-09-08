'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          forms: function($http) {
            return $http.get('/api/forms').then(function(forms) {
              return forms.data;
            });
          }
        }
      });
  });

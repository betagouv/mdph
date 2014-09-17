'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.detail', {
        url: '/:id',
        templateUrl: 'app/dashboard/detail/detail.html',
        controller: 'DetailCtrl',
        resolve: {
          form: function($http, $stateParams) {
            return $http.get('/api/forms/' + $stateParams.id).then(function(form) {
              return form.data;
            });
          }
        }
      });
  });

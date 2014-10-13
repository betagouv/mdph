'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail', {
        url: '/:id',
        templateUrl: 'app/dashboard/forms/detail/detail.html',
        controller: 'DetailCtrl',
        resolve: {
          form: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.id).then(function(form) {
              return form.data;
            });
          }
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms', {
        url: '/demandes',
        templateUrl: 'app/dashboard/forms/forms.html',
        controller: 'FormsCtrl',
        resolve: {
          forms: function($http) {
            return $http.get('/api/forms').then(function(forms) {
              return forms.data;
            });
          }
        }
      });
  });

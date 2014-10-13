'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms', {
        url: '/demandes',
        templateUrl: 'app/dashboard/forms/forms.html',
        controller: 'FormsCtrl',
        resolve: {
          requests: function(RequestResource) {
            return RequestResource.query({opened: true}).$promise;
          }
        },
        authenticate: true
      });
  });

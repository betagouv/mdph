'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms', {
        url: '/demandes',
        templateUrl: 'app/dashboard/forms/forms.html',
        controller: 'FormsCtrl',
        resolve: {
          forms: function(FormResource) {
            return FormResource.query();
          }
        },
        authenticate: true
      });
  });

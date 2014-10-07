'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.complementaire', {
        url: '/complementaire',
        templateUrl: 'app/dashboard/forms/detail/fileState.html',
        resolve: {
          currentStepName: function() {
            return 'complementaire';
          },
          nextStepName: function() {
            return 'evaluation';
          }
        },
        controller: 'FileStateCtrl'
      });
  });

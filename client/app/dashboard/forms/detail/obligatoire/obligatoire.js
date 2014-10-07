'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/dashboard/forms/detail/fileState.html',
        resolve: {
          currentStepName: function() {
            return 'obligatoire';
          },
          nextStepName: function() {
            return 'preevaluation';
          }
        },
        controller: 'FileStateCtrl'
      });
  });

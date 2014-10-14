'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'components/file-state/fileState.html',
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

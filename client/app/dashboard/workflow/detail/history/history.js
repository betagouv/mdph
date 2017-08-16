'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.detail.history', {
        url: '/vie_de_la_demande',
        controller: function(actions) {
          this.actions = actions;
        },

        controllerAs: 'workflowDetailHistoryCtrl',
        template: '<history actions="workflowDetailHistoryCtrl.actions" />',
        resolve: {
          actions: function($http, request) {
            return $http.get(`/api/requests/${ request.shortId }/history`).then(result => result.data);
          }
        },
        authenticate: true
      });
  });

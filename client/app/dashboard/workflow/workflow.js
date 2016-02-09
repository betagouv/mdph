'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow', {
        url: '/workflow',
        templateUrl: 'app/dashboard/workflow/workflow.html',
        controller: 'WorkflowCtrl',
        resolve: {
          requestCountByStatus: function(MdphResource, currentMdph, allStatus) {
            return MdphResource.queryTotalRequestsCount({zipcode: currentMdph.zipcode}).$promise.then(function(result) {
              if (result) {
                var resultByStatusId = _.indexBy(result, '_id');
                allStatus.forEach(function(status) {
                  status.count = resultByStatusId[status.id] && resultByStatusId[status.id].count;
                });
              }

              return allStatus;
            });
          },

          allStatus: function() {
            // TODO: extract as a constant ?
            return [{
              id: 'emise',
              label: 'Émise'
            },
            {
              id: 'enregistree',
              label: 'Enregistrée'
            },
            {
              id: 'en_attente_usager',
              label: 'En attente'
            },
            {
              id: 'archive',
              label: 'Archives'
            }];
          }
        },
        authenticate: true
      });
  });

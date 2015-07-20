'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, allSteps) {

    _.map(allSteps, function(step) {
      $stateProvider
        .state('departement.demande.' + step.id, {
          url: '/' + step.id,
          templateUrl: 'app/demande/steps/' + step.template,
          controller: step.controller,
          resolve: {
            step: function() {
              return step;
            },
            stepSections: function(sections) {
              return _.filter(sections, {group: step.id});
            },
            updateRequest: function(mainUpdateRequest) {
              return function() {
                mainUpdateRequest('departement.demande.' + step.id);
              };
            }
          }
        });
    });
  });

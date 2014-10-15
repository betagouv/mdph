'use strict';

angular.module('impactApp')
  .factory('RequestStepService', function RequestStepService($state, requestSteps) {
    var stepsById = _.indexBy(requestSteps, 'id');

    var resetConstants = function() {
      angular.forEach(requestSteps, function(step) {
        step.isEnabled = false;
        step.isFinished = false;
      });
    };

    return {
      getFormSteps: function(request) {
        resetConstants();

        if (!request) {
          stepsById.questionnaire.state = 'start';
        } else {
          angular.forEach(request.steps, function(step) {
            var currentStep = stepsById[step.name];
            currentStep.isEnabled = true;
            currentStep.isFinished = _.find(currentStep.states, {'name' : step.state }).isFinal;
          });
        }

        return requestSteps;
      }
    };
  });

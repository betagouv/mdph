'use strict';

angular.module('impactApp')
  .factory('RequestStepService', function RequestStepService($state, requestSteps) {
    var stepsById = _.indexBy(requestSteps, 'id');

    return {
      getFormSteps: function(request) {
        var currentStep;

        if (!request) {
          currentStep = stepsById.questionnaire;
          currentStep.state = 'start';
        } else {
          angular.forEach(request.steps, function(step) {
            currentStep = stepsById[step.name];
            currentStep.isEnabled = true;
            currentStep.isFinished = _.find(currentStep.states, {'name' : step.state }).isFinal;
          });
        }

        return requestSteps;
      }
    };
  });

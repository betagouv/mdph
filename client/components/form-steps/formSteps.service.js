'use strict';

angular.module('impactApp')
  .factory('FormStepService', function FormStepService($state, formSteps) {
    var stepsById = _.indexBy(formSteps, 'id');

    return {
      getFormSteps: function(form, parent) {
        var currentStep;

        if (form === null) {
          currentStep = stepsById.questionnaire;
          currentStep.state = 'start';
        } else {
          angular.forEach(form.steps, function(step) {
            currentStep = stepsById[step.name];
            currentStep.isEnabled = true;
            currentStep.isFinished = _.find(currentStep.states, {'name' : step.state }).isFinal;
          });
        }

        $state.go(parent + '.' + currentStep.sref);
        return formSteps;
      }
    };
  });

'use strict';

angular.module('impactApp')
  .component('navSteps', {
    templateUrl: 'components/nav-steps/nav-steps.html',
    bindings: {
      profile: '=',
      nextStep: '=',
      questionForm: '=',
      isLastQuestion: '='
    },
    controllerAs: 'navstepsctrl',
    controller: function() {
      this.check = (form) => {
        if (form.$invalid) {
          form.showError = true;
        } else {
          this.nextStep();
        }
      };
    }
  });

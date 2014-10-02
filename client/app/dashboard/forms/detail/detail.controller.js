'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, form, formSteps) {
    $scope.form = form;

    $scope.isFinal = function (step) {
      var formStep = _.find(formSteps, {'id': step.name});
      var state = _.find(formStep.states, {'name' : step.state});
      return state.isFinal;
    };
  });

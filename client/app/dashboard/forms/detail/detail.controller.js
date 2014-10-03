'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, form, formSteps) {
    $scope.form = form;

    $scope.getSaveFileStateRequest = function(step, file, state) {
      return $http.put(
        '/api/forms/' + $scope.form._id + '/document',
        {
          stepName: step.name,
          fileName: file.name,
          state: state
        }
      );
    };

    $scope.getStep = function(formStep) {
      return _.find(formSteps, {'id': formStep.name});
    };
  });

'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, form) {
    $scope.form = form;

    $scope.getSaveFileStateRequest = function(step, file, state) {
      return $http.put(
        '/api/requests/' + $scope.form._id + '/document',
        {
          stepName: step.name,
          fileName: file.name,
          state: state
        }
      );
    };
  });

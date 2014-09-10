'use strict';

angular.module('impactApp')
  .controller('FormsCtrl', function ($scope, $http, FormService, forms) {
    $scope.forms = forms;
    $scope.updatedAt = FormService.updatedAt;

    $scope.delete = function(form) {
      $http.delete('/api/forms/' + form._id);
      angular.forEach($scope.forms, function(f, i) {
        if (f === form) {
          $scope.forms.splice(i, 1);
        }
      });
    };
  });

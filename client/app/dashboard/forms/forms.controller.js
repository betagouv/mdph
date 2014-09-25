'use strict';

angular.module('impactApp')
  .controller('FormsCtrl', function ($scope, $http, $state, FormService, forms) {
    $scope.forms = forms;
    $scope.updatedAt = FormService.updatedAt;

    $scope.delete = function(form) {
      $http.delete('/api/forms/' + form._id);
      angular.forEach($scope.forms, function(f, i) {
        if (f._id === form._id) {
          $scope.forms.splice(i, 1);
          $state.go('dashboard.forms');
        }
      });
    };
  });

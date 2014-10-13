'use strict';

angular.module('impactApp')
  .controller('FormsCtrl', function ($scope, $http, $state, RequestService, requests) {
    $scope.forms = requests;
    $scope.updatedAt = RequestService.updatedAt;

    $scope.delete = function(form) {
      $http.delete('/api/requests/' + form._id).success(function() {
        angular.forEach($scope.forms, function(f, i) {
          if (f._id === form._id) {
            $scope.forms.splice(i, 1);
            $state.go('dashboard.forms');
          }
        });
      });
    };
  });

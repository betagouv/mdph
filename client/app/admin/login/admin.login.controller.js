'use strict';

angular.module('impactApp')
  .controller('AdminLoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.loginAdmin({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          return $state.go('admin.mdph', {currentUser: user}, {reload: true});
        })
        .catch(function(err) {
          console.log("err: " + JSON.stringify(err));
          $scope.error = err.message;
          return $state.go('admin.login');
        });
      }
    };
  });

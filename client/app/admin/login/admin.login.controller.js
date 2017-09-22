'use strict';

angular.module('impactApp')
  .controller('AdminLoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.loginAgent({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          return $state.go('admin.main', {currentUser: user}, {reload: true});
        })
        .catch(function(err) {
          $scope.error = err.message;
          return $state.go('admin.login');
        });
      }
    };
  });

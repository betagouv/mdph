'use strict';

angular.module('impactApp')
  .controller('EvaluationLoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.login({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          if (Auth.hasRole(user, 'admin') || Auth.hasRole(user, 'adminMdph')) {
            return $state.go('evaluation.dashboard', {currentUser: user}, {reload: true});
          }

          return $state.go('evaluation.login');
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

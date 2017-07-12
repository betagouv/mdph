'use strict';

angular.module('impactApp')
  .controller('EvaluationLoginCtrl', function($rootScope, $scope, Auth, $location, $state, $window) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.login({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          var path = $window.location.pathname.split('/');
          if (Auth.hasRole(user, 'admin') || Auth.hasRole(user, 'adminMdph')) {
            return $state.go('evaluation.dashboard', {codeDepartement: path[2]}, {reload: true});
          }
          return $state.go('evaluation.login');
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

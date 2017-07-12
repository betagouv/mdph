'use strict';

angular.module('impactApp')
  .controller('EvaluationLoginCtrl', function($rootScope, $scope, Auth, $location, currentMdph, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.login({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          if (Auth.hasRole(user, 'admin')) {
            return $state.go('evaluation.dashboard', {codeDepartement: currentMdph.zipcode}, {reload: true});
          }

          if (Auth.hasRole(user, 'adminMdph')) {
            return $state.go('evaluation.dashboard', {codeDepartement: user.mdph  && user.mdph.zipcode}, {reload: true});
          }

          return $state.go('evaluation.login');
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

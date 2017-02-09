'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $state, currentMdph) {
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
            return $state.go('dashboard.workflow', {codeDepartement: currentMdph.zipcode}, {reload: true});
          }

          if (Auth.hasRole(user, 'adminMdph')) {
            return $state.go('dashboard.workflow', {codeDepartement: user.mdph  && user.mdph.zipcode}, {reload: true});
          }

          return $state.go('mon_compte', {}, {reload: true});

        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

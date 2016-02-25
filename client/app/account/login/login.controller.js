'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.login({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          if ($rootScope.returnToState) {
            return $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams, {reload: true});
          }

          if (user.role === 'adminMdph') {
            return $state.go('dashboard.workflow', {zipcode: user.mdph  && user.mdph.zipcode}, {reload: true});
          }

          if (user.role === 'admin') {
            return $state.go('admin', {}, {reload: true});
          }

          return $state.go('espace_perso.mes_profils', {}, {reload: true});
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

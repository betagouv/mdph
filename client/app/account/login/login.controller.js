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
        .then(function(data) {
          // Logged in, redirect
          if ($rootScope.returnToState) {
            return $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
          }

          if (data.role === 'adminMdph') {
            return $state.go('dashboard.workflow', {zipcode: data.mdph  && data.mdph.zipcode});
          }

          if (data.role === 'admin') {
            return $state.go('admin');
          }

          return $state.go('espace_perso.mes_profils');
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

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
            $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
          } else if (data.role === 'adminMdph') {
            $state.go('dashboard.requests.user', {zipcode: data.mdph  && data.mdph.zipcode, userId: data.id});
          } else if (data.role === 'admin') {
            $state.go('admin');
          } else {
            $state.go('espace_perso.mes_profils');
          }
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

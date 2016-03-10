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
        .catch(function(err) {
          $scope.error = err.message;
        })
        .then(function(user) {
          if ($rootScope.returnToState) {
            return $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
          }

          if (Auth.isAdmin(user)) {
            return $state.go('dashboard.workflow', {codeDepartement: currentMdph.zipcode});
          }

          if (Auth.isAdminMdph(user)) {
            return $state.go('dashboard.workflow', {codeDepartement: user.mdph  && user.mdph.zipcode});
          }

          return $state.go('espace_perso.mes_profils');
        });
      }
    };
  });

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
          if (Auth.hasRoleAdmin()) {
            return $state.go('dashboard.workflow', {codeDepartement: currentMdph.zipcode}, {reload: true});
          }

          if (Auth.hasRoleAdminMdph()) {
            return $state.go('dashboard.workflow', {codeDepartement: user.mdph  && user.mdph.zipcode}, {reload: true});
          }

          if (user.isMultiProfiles) {
            return $state.go('mon_compte', {}, {reload: true});
          } else {
            return $state.go('profil', {profileId: 'me'}, {reload: true});
          }

        });
      }
    };
  });

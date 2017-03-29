'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $state, currentMdph, ProfileResource) {
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

          // When the user is logged, move to profile if only one is set.
          ProfileResource.count({userId: user._id}).$promise.then(function({count}) {
            if (count === 1) {
              return $state.go('profil', {profileId: 'me'});
            }

            return $state.go('departement', {}, {reload: true});
          });

        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

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
        .catch(function(err) {
          $scope.error = err.message;
        })
        .then(function(user) {
          if (Auth.isAdmin()) {
            return $state.go('dashboard.workflow', {codeDepartement: currentMdph.zipcode}, {reload: true});
          }

          if (Auth.isAdminMdph()) {
            return $state.go('dashboard.workflow', {codeDepartement: user.mdph  && user.mdph.zipcode}, {reload: true});
          }

          var uniqueProfile = false;
          if (!user.isMultiProfiles) {
            ProfileResource.query({userId: user._id})
              .$promise
              .then(function(profiles) {
                if (profiles.length === 1) {
                  uniqueProfile = profiles[0]._id;

                  if (uniqueProfile) {
                    return $state.go('espace_perso.mes_profils.profil', {profileId: uniqueProfile}, {reload: true});
                  } else {
                    return $state.go('espace_perso.mes_profils', {}, {reload: true});
                  }
                }
              });
          } else {
            return $state.go('espace_perso.mes_profils', {}, {reload: true});
          }

        });
      }
    };
  });

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

          if (Auth.hasRole(user, 'user')) {
            ProfileResource.query({userId: user._id}).$promise.then(function(profilList) {
              if (profilList.length === 1) {
                return $state.go('gestion_demande', {profilId: profilList[0]._id}, {reload: true});
              }

              return $state.go('gestion_profil', {}, {reload: true});
            });
          }

          return $state.go('login');
        })
        .catch(function(err) {
          $scope.error = err.message;
        });
      }
    };
  });

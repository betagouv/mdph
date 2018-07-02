'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function($http, $rootScope, $scope, Auth, $location, $state, currentMdph, ProfileResource) {
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

              var activeProfilList = profilList.filter(profil => !profil.deletedAt);

              if (activeProfilList.length === 0) {
                return $state.go('gestion_profil', {}, {reload: true});
              }

              if (activeProfilList.length > 1) {
                return $state.go('gestion_profil', {}, {reload: true});
              }

              $http.get(`/api/users/${user._id}/profiles/${activeProfilList[0]._id}/requests/last`).then(function({data}) {

                if (data && data.status !== 'validee' && data.status !== 'irrecevable') {
                  return $state.go('demande', {shortId: data.shortId}, {reload: true});
                } else {
                  return $state.go('gestion_demande', {profilId: activeProfilList[0]._id}, {reload: true});
                }
              });
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

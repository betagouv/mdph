'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(data) {
          // Logged in, redirect
          Auth.getCurrentUserAsync(function(user) {
            if ($rootScope.returnToState) {
              $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
            } else if (data.role === 'adminMdph') {
              $state.go('dashboard.requests.user', {zipcode: user.mdph.zipcode, userId: user._id});
            } else if (data.role === 'admin') {
              $state.go('admin');
            } else {
              $state.go('espace_perso.liste_demandes');
            }
          });
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });

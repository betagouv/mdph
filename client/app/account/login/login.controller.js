'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(data) {
          // Logged in, redirect
          if (data.role === 'adminMdph') {
            $state.go('dashboard');
          } else if (data.role === 'admin') {
            $state.go('admin');
          } else {
            $state.go('espace_perso.mon_compte');
          }
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });

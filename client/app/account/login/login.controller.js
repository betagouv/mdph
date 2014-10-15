'use strict';

angular.module('impactApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
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
            $location.path('/dashboard');
          } else if (data.role === 'admin') {
            $location.path('admin');
          } else {
            $location.path('/liste_demandes');
          }
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });

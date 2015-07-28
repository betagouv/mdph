'use strict';

angular.module('impactApp')
  .controller('ForgottenPasswordCtrl', function($scope, $state, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.checkMail = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        User.generateToken({email: $scope.user.email});
        $state.go('.confirmation');
      }
    };
  });

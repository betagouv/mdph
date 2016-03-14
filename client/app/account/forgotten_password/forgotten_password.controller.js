'use strict';

angular.module('impactApp')
  .controller('ForgottenPasswordCtrl', function($scope, $state, User, currentMdph) {
    $scope.user = {};
    $scope.errors = {};

    $scope.checkMail = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        User.generateToken({email: $scope.user.email, mdph: currentMdph.zipcode});
        $state.go('.confirmation');
      }
    };
  });

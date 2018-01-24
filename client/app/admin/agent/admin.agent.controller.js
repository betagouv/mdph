'use strict';

angular.module('impactApp')
.controller('AdminAgentCtrl', function($scope, $state, mdphs, User) {
  this.mdphs = mdphs;
  $scope.agent = {};

  function randomPassword(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    var password = '';
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      password += chars.charAt(i);
    }

    return password;
  }

  this.resetMongooseError = function(form, field) {
    form[field].$setValidity('mongoose', true);
  };

  this.submit = function(form) {

    if (form.$valid) {

      $scope.agent.password = randomPassword(10);

      var user = new User();
      user.name = $scope.agent.name;
      user.email = $scope.agent.email;
      user.password = $scope.agent.password;
      user.role = 'adminMdph';
      user.mdph = $scope.agent.mdph._id;

      user.$saveAgent()
      .then(function() {
        $scope.show = true;
      })
      .catch(function(err) {
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });
    }
  };

  this.new = function() {
    $scope.show = false;
    $scope.agent = {};
  };

});

'use strict';

angular.module('impactApp')
  .component('passwordStrengthBar', {
    bindings: {
      password: '='
    },
    templateUrl: 'components/password-strength-bar/password-strength-bar.html',
    controllerAs: 'passwordStrengthBarCtrl',
    controller() {
      this.passwordStrength = zxcvbn;
    }
  });

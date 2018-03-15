'use strict';

angular.module('impactApp')
  .component('passwordRulesAlert', {
    bindings: {
      password: '<'
    },
    templateUrl: 'components/password-rules-alert/password-rules-alert.html',
    controllerAs: 'passwordRulesAlertCtrl',
    controller() {
    }
  });

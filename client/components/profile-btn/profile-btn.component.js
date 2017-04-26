'use strict';

angular.module('impactApp')
  .component('profileBtn', {
    templateUrl: 'components/profile-btn/profile-btn.html',
    bindings: {
      profile: '<',
    },
    controllerAs: 'profilebtnctrl',
    controller: function() {
    }
  });

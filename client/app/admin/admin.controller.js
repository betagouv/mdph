'use strict';

angular.module('impactApp')
  .controller('AdminCtrl', function($scope, $state, Auth) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.logout = Auth.logout;

    this.getCurrentMdphZipcode =  function() {
      if (this.getCurrentUser().mdph) {
        return this.getCurrentUser().mdph.zipcode;
      }
    };
  });


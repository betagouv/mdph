'use strict';

angular.module('impactApp')
  .controller('MdphCtrl', function(Auth, currentMdph, currentUser) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;

    this.isOpened = () => {
      return currentMdph.opened;
    };

    this.isClosed = () => {
      return !currentMdph.opened;
    };
  });

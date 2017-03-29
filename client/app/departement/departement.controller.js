'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($http, $timeout, Auth, currentMdph, currentUser) {
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

    this.submit = () => {
      this.loading = true;
      this.thankyou = false;

      $http.post(`/api/mdphs/${currentMdph.zipcode}/like`, {email: this.subscribeEmail})
        .then(this.showThanks);
    };

    this.showThanks = () => {
      $timeout(() => {
        this.loading = false;
        this.thankyou = true;
      }, 1000);
    };

    this.showDashboard = () => {
      return Auth.getCurrentUser() && Auth.isAdminMdph(Auth.getCurrentUser(), currentMdph);
    };
  });

'use strict';

angular.module('impactApp')
  .controller('ClosedCtrl', function($http, $timeout, currentMdph) {
    this.currentMdph = currentMdph;

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
  });

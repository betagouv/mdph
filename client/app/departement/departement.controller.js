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
  })
  .directive('mdphPhoto', function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attr) {
          element.attr('style', 'background-image : url(/api/mdphs/' + attr.mdphPhoto + '/photo/)');
        }
      };
  });

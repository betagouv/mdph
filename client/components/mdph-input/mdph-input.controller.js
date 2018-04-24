'use strict';

angular.module('impactApp')
  .controller('MdphInputCtrl', function(MdphResource, $state) {

    this.zipcode = '';

    this.isOk =  () => {
      const zipcodeRegex = /^([0-8][0-9]|9[0-5]|2A|2a|2B|2b|97[1-4]|976)$/;
      return zipcodeRegex.test(this.zipcode);
    };

    this.go = () => {
      const codeDepartement = this.zipcode.toUpperCase();
      MdphResource.get({zipcode: codeDepartement}).$promise.then(function(mdph) {
        if (mdph.opened) {

          $state.go('gestion_profil', {codeDepartement});
        } else {

          $state.go('closed', {codeDepartement});
        }
      });
    };

  });

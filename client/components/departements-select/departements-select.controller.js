'use strict';

angular.module('impactApp')
  .controller('DepsSelectpCtrl', function() {
    console.log('TOTO', this.mdphs);
    this.mdph = 0;
    this.goToMdph = () => {
      console.log('change', this.mdph);
      window.location = '/mdph/' + this.mdph;
    };
  });

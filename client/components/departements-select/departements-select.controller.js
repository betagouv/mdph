'use strict';

angular.module('impactApp')
  .controller('DepsSelectpCtrl', function(MdphResource) {
    MdphResource.query(mdphs => this.mdphs = mdphs);

    this.mdph = 0;
    this.goToMdph = () => {
      console.log('change', this.mdph);
      //window.location = '/mdph/' + this.mdph;
    };
  });

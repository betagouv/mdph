'use strict';

angular.module('impactApp')
  .controller('DepsSelectpCtrl', function(MdphResource) {
    MdphResource.query(mdphs => this.mdphs = mdphs);
    this.mdph = 0;
  });

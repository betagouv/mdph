'use strict';

angular.module('impactApp')
  .controller('DepsSelectpCtrl', function(MdphResource, $state) {
    MdphResource.query(mdphs => this.mdphs = mdphs);
    this.mdph = 0;
    this.goToMdph = item => $state.go('departement', {codeDepartement: item.zipcode});
  });

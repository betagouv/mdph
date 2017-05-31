'use strict';

angular.module('impactApp')
  .controller('DepsSelectpCtrl', function(MdphResource, $state) {
    MdphResource.query(mdphs => this.mdphs = mdphs);
    this.goToMdph = zipcode => $state.go('departement', {codeDepartement: zipcode});
  });

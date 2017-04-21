'use strict';

angular.module('impactApp').component('mdphFooter', {
  templateUrl: 'components/footer/footer.html',
  controllerAs: 'footer',
  bindings: {
    mdph: '<'
  },
  controller: function() {
    this.sortedLocations = _.sortBy(this.mdph.locations, 'headquarters');
  },
});

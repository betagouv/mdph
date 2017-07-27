'use strict';

angular.module('impactApp')
  .component('displayBanetteCount', {
    bindings: {
      count: '<',
    },
    templateUrl: 'components/menu-dashboard/display-banette-count.html',
    controllerAs: 'displayBanetteCountCtrl',
    controller() {}
  });

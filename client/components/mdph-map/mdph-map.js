'use strict';

angular.module('impactApp').component('mdphMap', {
  template: '<div id="map"></div>',
  controller: 'MdphMapCtrl',
  controllerAs: 'mdphmapctrl',
  bindings: {
    mdph: '=',
  }
});

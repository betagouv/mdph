'use strict';

angular.module('impactApp').component('depsMap', {
  template: '<div id="map"></div>',
  controller: 'DepsMapCtrl',
  controllerAs: 'depsmapctrl',
  bindings: {
    depsgeo: '<'
  }
});

'use strict';

angular.module('impactApp').component('mdphMap', {
  templateUrl: 'components/mdph-map/mdph-map.html',
  controller: 'MdphMapCtrl',
  controllerAs: 'mdphmapctrl',
  bindings: {
    mdph: '=',
  }
});

'use strict';

angular.module('impactApp').component('depsSelect', {
  templateUrl: 'components/departements-select/departements-select.html',
  controller: 'DepsSelectpCtrl',
  controllerAs: 'depsselectpctrl',
  bindings: {
    mdphs: '<',
  }
});

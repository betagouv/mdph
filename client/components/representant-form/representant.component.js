'use strict';

angular.module('impactApp').component('representantForm', {
  templateUrl: 'components/representant-form/representant.html',
  controller: 'RepresentantCtrl',
  controllerAs: 'representantctrl',
  bindings: {
    identite: '=',
    id: '<',
    required: '<',
    currentMdph: '<',
  }
});

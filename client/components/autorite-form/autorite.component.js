'use strict';

angular.module('impactApp').component('autoriteForm', {
  templateUrl: 'components/autorite-form/autorite.html',
  controller: 'AutoriteCtrl',
  controllerAs: 'autoritectrl',
  bindings: {
    identite: '=',
    id: '<',
    required: '<'
  }
});

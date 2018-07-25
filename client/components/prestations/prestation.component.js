'use strict';

angular.module('impactApp')
  .component('prestation', {
    templateUrl: 'components/prestations/prestation.html',
    bindings: {
      prestation: '=ngModel',
      precision: '@'
    },
    controllerAs: 'prestationCtrl',
    controller: function() {}
  });

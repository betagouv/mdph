'use strict';

angular.module('impactApp')
  .component('prestation', {
    templateUrl: 'components/prestations/prestation.html',
    bindings: {
      prestation: '=ngModel'
    },
    controllerAs: 'prestationctrl',
    controller: function() {
    }
  });

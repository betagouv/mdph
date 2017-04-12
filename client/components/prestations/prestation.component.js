'use strict';

angular.module('impactApp')
  .component('prestation', {
    templateUrl: 'components/prestations/prestation.html',
    bindings: {
      prestation: '=ngModel',
      titre: '@',
      link: '@'
    },
    controllerAs: 'prestationctrl',
    controller: function() {
    }
  });

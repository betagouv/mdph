'use strict';

angular.module('impactApp')
  .component('prestation', {
    templateUrl: 'components/prestations/prestation.html',
    bindings: {
      prestation: '=',
      id: '@',
      titre: '@',
      link: '@'
    },
    controllerAs: 'prestationctrl',
    controller: function() {
      console.log('this.prestation, this.id, this.label, this.url', this.prestation, this.id, this.label, this.url, this);
    }
  });

'use strict';

angular.module('impactApp').component('demandeCategory', {
  templateUrl: 'components/demande-category/demande-category.html',
  controller: 'DemandeCategoryCtrl',
  controllerAs: 'demandeCategoryCtrl',
  bindings: {
    options: '<',
    demande: '<',
    completion: '<',
  },
});

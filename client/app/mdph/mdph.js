'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('mdph-main', {
        parent: 'layout',
        url: '',
        templateUrl: 'app/mdph/mdph.html',
        controller: 'MdphCtrl',
        controllerAs: 'mdphCtrl',
      });
  });

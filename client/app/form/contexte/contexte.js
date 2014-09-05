'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/contexte', '/form/contexte/pour_commencer');
    $stateProvider
      .state('form.contexte', {
        url: '/contexte',
        template: '<subsection/><ui-view/>',
        controller: 'ContexteCtrl'
      });
  });

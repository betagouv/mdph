'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/vie_quotidienne', '/form/vie_quotidienne/situation');
    $stateProvider
      .state('form.vie_quotidienne', {
        url: '/vie_quotidienne',
        template: '<subsection/><ui-view/>',
        controller: 'VieQuotidienneCtrl'
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_travail', '/form/votre_travail/situation_professionnelle');
    $stateProvider
      .state('form.votre_travail', {
        url: '/votre_travail',
        template: '<subsection/><ui-view/>',
        controller: 'TravailCtrl',
      });
  });

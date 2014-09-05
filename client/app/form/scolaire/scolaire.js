'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_scolarite', '/form/votre_scolarite/situation');
    $stateProvider
      .state('form.votre_scolarite', {
        url: '/votre_scolarite',
        template: '<subsection/><ui-view/>',
        controller: 'ScolaireCtrl',
      });
  });

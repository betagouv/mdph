'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionnaire.projet_de_vie.vie_quotidienne', {
        url: '/vie_quotidienne',
        template: '<subsection/><ui-view/>',
        controller: 'VieQuotidienneCtrl'
      });
  });

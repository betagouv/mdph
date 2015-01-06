'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire.projet_de_vie.vie_quotidienne', {
        url: '/vie_quotidienne',
        template: '<subsection/><div class="container"><ui-view/></div>',
        controller: 'VieQuotidienneCtrl'
      });
  });

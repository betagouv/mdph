'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire.projet_de_vie.scolarite', {
        url: '/scolarite',
        template: '<subsection/><div class="container"><ui-view/></div>',
        controller: 'ScolaireCtrl',
      });
  });

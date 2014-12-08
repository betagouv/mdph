'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire.projet_de_vie.scolarite', {
        url: '/scolarite',
        template: '<subsection/><ui-view/>',
        controller: 'ScolaireCtrl',
      });
  });

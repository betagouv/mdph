'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_scolarite/situation', '/form/votre_scolarite/situation/condition');
    $stateProvider.state('form.votre_scolarite.situation', {
      url: '/situation',
      template: '<ui-view/>',
      controller: 'SituationScolaireCtrl'
    }).state('form.votre_scolarite.situation.condition', {
      url: '/condition',
      templateUrl: 'components/question/radio.html',
      controller: 'ConditionScolaireCtrl'
    }).state('form.votre_scolarite.situation.type_scolaire', {
      url: '/type_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'TypeScolaireCtrl'
    }).state('form.votre_scolarite.situation.etablissement', {
      url: '/etablissement',
      templateUrl: 'components/question/etablissement_scolaire.html',
      controller: 'EtablissementScolaireCtrl'
    }).state('form.votre_scolarite.situation.raison_non_scolaire', {
      url: '/raison_non_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'RaisonNonScolaireCtrl'
    });
  });

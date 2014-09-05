'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_travail/situation_professionnelle', '/form/votre_travail/situation_professionnelle/condition');
    $stateProvider.state('form.votre_travail.situation_professionnelle', {
      url: '/situation_professionnelle',
      template: '<ui-view/>',
      controller: 'SituationVieCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.condition', {
      url: '/condition',
      templateUrl: 'components/question/radio.html',
      controller: 'ConditionTravailCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.milieu', {
      url: '/milieu',
      templateUrl: 'components/question/radio.html',
      controller: 'MilieuCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.type', {
      url: '/type',
      templateUrl: 'components/question/radio.html',
      controller: 'TypeEmploiCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.employeur', {
      url: '/employeur',
      templateUrl: 'components/question/employeur.html',
      controller: 'EmployeurCtrl'
    });
  });

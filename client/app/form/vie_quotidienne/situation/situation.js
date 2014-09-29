'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/vie_quotidienne/situation', '/form/vie_quotidienne/situation/vie_famille');
    $stateProvider.state('form.vie_quotidienne.situation', {
      url: '/situation',
      template: '<ui-view/>'
    }).state('form.vie_quotidienne.situation.vie_famille', {
      url: '/vie_famille',
      templateUrl: 'components/question/radio.html',
      controller: 'VieFamilleCtrl'
    }).state('form.vie_quotidienne.situation.logement', {
      url: '/logement',
      templateUrl: 'components/question/radio.html',
      controller: 'LogementCtrl'
    }).state('form.vie_quotidienne.situation.fin_de_droits', {
      url: '/fin_de_droits',
      templateUrl: 'components/question/droits.html',
      controller: 'FinDeDroitsCtrl'
    });
  });

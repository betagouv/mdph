'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'questionnaire.projet_de_vie.vie_quotidienne';
    $stateProvider.state(index + '.situation', {
      url: '/situation',
      template: '<ui-view/>',
      abstract: true
    }).state(index + '.situation.vie_famille', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'VieFamilleCtrl'
    }).state(index + '.situation.logement', {
      url: '/logement',
      templateUrl: 'components/question/radio.html',
      controller: 'LogementCtrl'
    });
  });

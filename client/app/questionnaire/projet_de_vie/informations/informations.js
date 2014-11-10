'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
  var index = 'questionnaire.projet_de_vie.informations';
  $stateProvider
    .state(index, {
      url: '/informations',
      template: '<ui-view></ui-view>',
      controller: 'InformationsCtrl',
      abstract: true
    }).state(index + '.representant', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'RepresentantCtrl'
    }).state(index+ '.consentement', {
      url: '/consentement',
      templateUrl: 'components/question/radio.html',
      controller: 'ConsentementCtrl'
    }).state(index+ '.code_postal', {
      url: '/code_postal',
      templateUrl: 'components/question/code_postal.html',
      controller: 'CodePostalCtrl',
      resolve: {
        mdphs: function(Mdph) {
          return Mdph.queryAll();
        }
      }
    });
  });

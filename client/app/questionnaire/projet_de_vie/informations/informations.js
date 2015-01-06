'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
  var index = 'departement.questionnaire.projet_de_vie.informations';
  $stateProvider
    .state(index, {
      url: '/informations',
      template: '<div class="container"><ui-view/></div>',
      controller: 'InformationsCtrl',
      abstract: true
    })
    .state(index + '.representant', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'RepresentantCtrl'
    })
    .state(index + '.consentement', {
      url: '/consentement',
      templateUrl: 'components/question/radio.html',
      controller: 'ConsentementCtrl'
    })
    .state(index + '.code_postal', {
      url: '/code_postal',
      templateUrl: 'components/question/code_postal.html',
      controller: 'CodePostalCtrl',
      resolve: {
        mdphs: function(Mdph) {
          return Mdph.queryAll();
        }
      }
    })
    .state(index + '.date_naissance', {
      url: '/date_naissance',
      templateUrl: 'components/question/date_naissance.html',
      controller: 'DateNaissanceCtrl'
    });
  });

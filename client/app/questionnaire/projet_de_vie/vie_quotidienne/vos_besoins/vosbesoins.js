'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'questionnaire.projet_de_vie.vie_quotidienne';
    $stateProvider.state(index + '.vos_besoins', {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: 'BesoinsVieCtrl',
      abstract: true
    }).state(index + '.vos_besoins.quotidien', {
      url: '/quotidien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuotidienCtrl'
    }).state(index + '.vos_besoins.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'DeplacementCtrl'
    }).state(index + '.vos_besoins.social', {
      url: '/social',
      templateUrl: 'components/question/checkbox.html',
      controller: 'SocialCtrl'
    }).state(index + '.vos_besoins.lieu_de_vie', {
      url: '/lieu_de_vie',
      templateUrl: 'components/question/checkbox.html',
      controller: 'LieuDeVieCtrl'
    });
  });

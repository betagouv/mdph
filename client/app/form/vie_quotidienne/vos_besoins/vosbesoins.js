'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/vie_quotidienne/vos_besoins', '/form/vie_quotidienne/vos_besoins/quotidien');
    $stateProvider.state('form.vie_quotidienne.vos_besoins', {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: 'BesoinsVieCtrl'
    }).state('form.vie_quotidienne.vos_besoins.quotidien', {
      url: '/quotidien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuotidienCtrl'
    }).state('form.vie_quotidienne.vos_besoins.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'DeplacementCtrl'
    }).state('form.vie_quotidienne.vos_besoins.social', {
      url: '/social',
      templateUrl: 'components/question/checkbox.html',
      controller: 'SocialCtrl'
    }).state('form.vie_quotidienne.vos_besoins.lieu_de_vie', {
      url: '/lieu_de_vie',
      templateUrl: 'components/question/checkbox.html',
      controller: 'LieuDeVieCtrl'
    });
  });

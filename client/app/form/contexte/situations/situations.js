'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/contexte/situations', '/form/contexte/situations/particulieres');
    $stateProvider.state('form.contexte.situations', {
      url: '/situations',
      template: '<ui-view/>'
    }).state('form.contexte.situations.particulieres', {
      url: '/particulieres',
      templateUrl: 'components/question/checkbox.html',
      controller: 'ParticulieresCtrl'
    });
  });

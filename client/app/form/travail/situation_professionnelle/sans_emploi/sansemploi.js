'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_travail/situation_professionnelle/sans_emploi', '/form/votre_travail/situation_professionnelle/sans_emploi/passe');
    $stateProvider.state('form.votre_travail.situation_professionnelle.sans_emploi', {
      url: '/sans_emploi',
      template: '<ui-view/>'
    })
    .state('form.votre_travail.situation_professionnelle.sans_emploi.passe', {
      url: '/passe',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiPasseCtrl'
    })
    .state('form.votre_travail.situation_professionnelle.sans_emploi.pole_emploi', {
      url: '/pole_emploi',
      templateUrl: 'components/question/checkbox.html',
      controller: 'PoleEmploiCtrl'
    });
  });

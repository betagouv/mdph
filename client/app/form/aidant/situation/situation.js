'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_aidant/situation', '/form/votre_aidant/situation/lien');
    $stateProvider.state('form.votre_aidant.situation', {
      url: '/situation',
      template: '<ui-view/>',
      controller: 'SituationAidantCtrl'
    })
    .state('form.votre_aidant.situation.lien', {
      url: '/lien',
      templateUrl: 'components/question/textinput.html',
      controller: 'AidantLienCtrl'
    })
    .state('form.votre_aidant.situation.vie', {
      url: '/vie',
      templateUrl: 'components/question/radio.html',
      controller: 'VieAidantCtrl'
    })
    .state('form.votre_aidant.situation.emploi', {
      url: '/emploi',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiAidantCtrl'
    })
    .state('form.votre_aidant.situation.nature_aide', {
      url: '/nature_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'NatureAideCtrl'
    })
    .state('form.votre_aidant.situation.nature_aide_bis', {
      url: '/nature_aide_bis',
      templateUrl: 'components/question/checkbox.html',
      controller: 'NatureAideBisCtrl'
    })
    .state('form.votre_aidant.situation.dedommagement', {
      url: '/dedommagement',
      templateUrl: 'components/question/radio.html',
      controller: 'DedommagementCtrl'
    })
    .state('form.votre_aidant.situation.accompagnement', {
      url: '/accompagnement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'AccompagnementCtrl'
    })
    .state('form.votre_aidant.situation.soutien', {
      url: '/soutien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'SoutienCtrl'
    })
    .state('form.votre_aidant.situation.empechement', {
      url: '/empechement',
      templateUrl: 'components/question/radio.html',
      controller: 'EmpechementCtrl'
    })
    .state('form.votre_aidant.situation.situation_future', {
      url: '/situation_future',
      templateUrl: 'components/question/radio.html',
      controller: 'SituationFutureCtrl'
    })
    .state('form.votre_aidant.situation.renseignements', {
      url: '/renseignements',
      templateUrl: 'components/question/checkbox.html',
      controller: 'RenseignementsAidantCtrl'
    });
  });

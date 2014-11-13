'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'questionnaire.projet_de_vie.aidant.situation';
    $stateProvider.state(index, {
      url: '/situation',
      template: '<ui-view/>',
      controller: 'SituationAidantCtrl',
      abstract: true
    })
    .state(index + '.lien', {
      url: '/lien',
      templateUrl: 'components/question/textinput.html',
      controller: 'AidantLienCtrl'
    })
    .state(index + '.vie', {
      url: '/vie',
      templateUrl: 'components/question/radio.html',
      controller: 'VieAidantCtrl'
    })
    .state(index + '.emploi', {
      url: '/emploi',
      templateUrl: 'components/question/radio.html',
      controller: 'EmploiAidantCtrl'
    })
    .state(index + '.nature_aide', {
      url: '/nature_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'NatureAideCtrl'
    })
    .state(index + '.dedommagement', {
      url: '/dedommagement',
      templateUrl: 'components/question/radio.html',
      controller: 'DedommagementCtrl'
    })
    .state(index + '.accompagnement', {
      url: '/accompagnement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'AccompagnementCtrl'
    })
    .state(index + '.soutien', {
      url: '/soutien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'SoutienCtrl'
    })
    .state(index + '.empechement', {
      url: '/empechement',
      templateUrl: 'components/question/radio.html',
      controller: 'EmpechementCtrl'
    })
    .state(index + '.situation_future', {
      url: '/situation_future',
      templateUrl: 'components/question/checkbox.html',
      controller: 'SituationFutureCtrl'
    })
    .state(index + '.renseignements', {
      url: '/renseignements',
      templateUrl: 'components/question/checkbox.html',
      controller: 'RenseignementsAidantCtrl'
    });
  });

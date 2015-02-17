'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.aidant';

    $stateProvider
      .state(index, {
        url: '/aidant',
        templateUrl: 'app/questionnaire/aidant/aidant.html',
        controller: 'AidantCtrl',
        abstract: true
      })

      // Situation
      .state(index + '.situation', {
        url: '/situation',
        template: '<ui-view/>',
        controller: 'SituationAidantCtrl',
        abstract: true
      })
      .state(index + '.situation.lien', {
        url: '/lien',
        templateUrl: 'components/question/textinput.html',
        controller: 'AidantLienCtrl'
      })
      .state(index + '.situation.vie', {
        url: '/vie',
        templateUrl: 'components/question/radio.html',
        controller: 'VieAidantCtrl'
      })
      .state(index + '.situation.emploi', {
        url: '/emploi',
        templateUrl: 'components/question/radio.html',
        controller: 'EmploiAidantCtrl'
      })
      .state(index + '.situation.nature_aide', {
        url: '/nature_aide',
        templateUrl: 'components/question/checkbox.html',
        controller: 'NatureAideCtrl'
      })
      .state(index + '.situation.dedommagement', {
        url: '/dedommagement',
        templateUrl: 'components/question/radio.html',
        controller: 'DedommagementCtrl'
      })
      .state(index + '.situation.accompagnement', {
        url: '/accompagnement',
        templateUrl: 'components/question/checkbox.html',
        controller: 'AccompagnementCtrl'
      })
      .state(index + '.situation.soutien', {
        url: '/soutien',
        templateUrl: 'components/question/checkbox.html',
        controller: 'SoutienCtrl'
      })
      .state(index + '.situation.empechement', {
        url: '/empechement',
        templateUrl: 'components/question/radio.html',
        controller: 'EmpechementCtrl'
      })
      .state(index + '.situation.situation_future', {
        url: '/situation_future',
        templateUrl: 'components/question/checkbox.html',
        controller: 'SituationFutureCtrl'
      })
      .state(index + '.situation.renseignements', {
        url: '/renseignements',
        templateUrl: 'components/question/checkbox.html',
        controller: 'RenseignementsAidantCtrl'
      })

      // Attentes
      .state(index + '.vos_attentes', {
        url: '/vos_attentes',
        template: '<ui-view/>',
        controller: 'VosAttentesAidantCtrl',
        abstract: true
      })
      .state(index + '.vos_attentes.type_attente', {
        url: '/type_attente',
        templateUrl: 'components/question/checkbox.html',
        controller: 'TypeAttenteAidantCtrl'
      })
      .state(index + '.vos_attentes.structure', {
        url: '/structure',
        templateUrl: 'components/question/structure.html',
        controller: 'AttenteStructureAidantCtrl'
      })
      .state(index + '.vos_attentes.autres_renseignements', {
        url: '/autres_renseignements',
        templateUrl: 'components/question/autres_renseignements.html',
        controller: 'AutresRenseignementsAidantCtrl'
      });
  });

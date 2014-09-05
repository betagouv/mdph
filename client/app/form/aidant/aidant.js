'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_aidant', '/form/votre_aidant/condition');
    $stateProvider
      .state('form.votre_aidant', {
        url: '/votre_aidant',
        template: '<subsection/><ui-view/>',
        controller: 'AidantCtrl',
      })
      .state('form.votre_aidant.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'ConditionAidantCtrl',
      });
  });

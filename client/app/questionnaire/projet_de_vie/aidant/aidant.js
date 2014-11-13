'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('questionnaire.projet_de_vie.aidant', {
        url: '/aidant',
        template: '<subsection/><ui-view/>',
        controller: 'AidantCtrl',
        abstract: true
      })
      .state('questionnaire.projet_de_vie.aidant.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'ConditionAidantCtrl',
      });
  });

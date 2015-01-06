'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('departement.questionnaire.projet_de_vie.aidant', {
        url: '/aidant',
        template: '<subsection/><div class="container"><ui-view/></div>',
        controller: 'AidantCtrl',
        abstract: true
      })
      .state('departement.questionnaire.projet_de_vie.aidant.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'ConditionAidantCtrl',
      });
  });

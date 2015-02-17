'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire.vie_quotidienne', {
        url: '/vie_quotidienne',
        templateUrl: 'app/questionnaire/vie_quotidienne/vie_quotidienne.html',
        controller: 'VieQuotidienneCtrl'
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire.identite', {
        url: '/identite',
        templateUrl: 'app/questionnaire/identite/identite.html',
        controller: 'IdentiteCtrl'
      });
  });

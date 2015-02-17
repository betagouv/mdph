'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/questionnaire/questionnaire.html',
        controller: 'QuestionnaireCtrl'
      })
      .state('departement.questionnaire.question_renouvellement', {
        url: '/renouvellement',
        templateUrl: 'app/questionnaire/question_renouvellement.html'
      });
  });

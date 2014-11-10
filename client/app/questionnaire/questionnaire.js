'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/questionnaire/questionnaire.html',
        controller: 'QuestionnaireCtrl',
        abstract: true
      })
      .state('questionnaire.question_renouvellement', {
        url: '',
        templateUrl: 'app/questionnaire/question_renouvellement.html'
      });
  });

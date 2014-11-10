'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider.state('questionnaire.renouvellement', {
      url: '/renouvellement',
      templateUrl: 'components/question/radio.html',
      controller: 'RenouvellementCtrl'
    });
  });

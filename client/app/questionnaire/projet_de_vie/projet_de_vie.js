'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionnaire.projet_de_vie', {
        url: '/projet_de_vie',
        templateUrl: 'app/questionnaire/projet_de_vie/projet_de_vie.html',
        controller: 'ProjetDeVieCtrl',
        abstract: true
      });
  });


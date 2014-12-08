'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.travail';
    $stateProvider.state(index + '.situation_professionnelle', {
      url: '/situation_professionnelle',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.situation_professionnelle.condition', {
      url: '/condition',
      templateUrl: 'components/question/radio.html',
      controller: 'ConditionTravailCtrl'
    })
    .state(index + '.situation_professionnelle.milieu', {
      url: '/milieu',
      templateUrl: 'components/question/radio.html',
      controller: 'MilieuCtrl'
    })
    .state(index + '.situation_professionnelle.type', {
      url: '/type',
      templateUrl: 'components/question/radio.html',
      controller: 'TypeEmploiCtrl'
    })
    .state(index + '.situation_professionnelle.employeur', {
      url: '/employeur',
      templateUrl: 'components/question/employeur.html',
      controller: 'EmployeurCtrl'
    });
  });

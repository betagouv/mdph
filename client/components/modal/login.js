'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.envoi.modal';
    $stateProvider
      .state(index + '.login', {
        url: '/login',
        views: {
          'modal@': {
            templateUrl: 'components/modal/login.html'
          }
        }
      })
      .state(index + '.signup', {
        url: '/signup',
        views: {
          'modal@': {
            templateUrl: 'components/modal/signup.html'
          }
        }
      });
  });

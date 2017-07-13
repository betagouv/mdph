'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation.login', {
        parent: 'evaluation',
        url: '/login',
        templateUrl: 'app/evaluation/login/evaluation.login.html',
        controller: 'EvaluationLoginCtrl',
        controllerAs: 'evaluationLoginCtrl',
        data: {
          title: 'Connexion'
        }
      })
  .state('evaluation.logout', {
        parent: 'evaluation',
        url: '/logout',
        template: '',
        controller: function($state, Auth) {
          $state.go('evaluation.login');
          Auth.logout();
        }
      });
  });

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
<<<<<<< HEAD
      .state('evaluation.logout', {
=======
  .state('evaluation.logout', {
>>>>>>> 0e6114f0706fc4edac8aa15dd5a027de3a1d0025
        parent: 'evaluation',
        url: '/logout',
        template: '',
        controller: function($state, Auth) {
          $state.go('evaluation.login');
          Auth.logout();
        }
      });
  });

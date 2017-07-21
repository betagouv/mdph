'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation', {
        url: '/evaluation',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/evaluation/evaluation.html',
        controller: 'EvaluationCtrl',
        controllerAs: 'evaluationCtrl',
        abstract: true,
        data: {
          title: 'Outil de soutien'
        }
      });
  });

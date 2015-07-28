'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.preparation_evaluation', {
        url: '/preparation_evaluation',
        templateUrl: 'app/dashboard/preparation_evaluation/preparation_evaluation.html',
        controller: 'PreparationEvalCtrl',
        authenticate: true,
        resolve: {
          evalQuestions: function($http) {
            return $http.get('api/questions-preparation-evaluation').then(function(result) {
              var evalQuestions = result.data;
              return evalQuestions;
            });
          }
        }
      });
  });

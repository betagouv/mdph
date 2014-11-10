'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/dashboard/requests/detail/questionnaire/questionnaire.html',
        controller: function($scope, DroitService, prestations) {
          $scope.prestations = DroitService.compute($scope.request.formAnswers, prestations);
        },
        resolve: {
          prestations: function($http) {
            return $http.get('/api/prestations').then(function(prestations) {
              return prestations.data;
            });
          }
        }
      });
  });

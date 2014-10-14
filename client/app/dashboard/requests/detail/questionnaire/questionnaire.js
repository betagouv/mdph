'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/dashboard/requests/detail/questionnaire/questionnaire.html',
        controller: function($scope, DroitService) {
          $scope.prestations = DroitService.compute($scope.request.formAnswers);
        }
      });
  });

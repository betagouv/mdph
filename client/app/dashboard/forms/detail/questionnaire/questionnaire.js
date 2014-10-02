'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.questionnaire', {
        url: '/questionnaire',
        templateUrl: 'app/dashboard/forms/detail/questionnaire/questionnaire.html',
        controller: function($scope, DroitService) {
          $scope.prestations = DroitService.compute($scope.form.formAnswers);
        }
      });
  });

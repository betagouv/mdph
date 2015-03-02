'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.list.user.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/requests/list/detail/evaluation/evaluation.html',
        controller: 'EvaluationDemandeCtrl',
        resolve: {
          sections: function(GevaService) {
            return GevaService.getSections();
          }
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/evaluation.html',
        controller: 'EvaluationDemandeCtrl',
        resolve: {
          sections: function(GevaService) {
            return GevaService.getSections();
          }
        }
      });
  });

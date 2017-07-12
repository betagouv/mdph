'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation.dashboard', {
        url: '/evaluation/dashboard',
        parent : 'evaluation',
        authenticate: true,
        templateUrl: 'app/evaluation/dashboard/evaluation.dashboard.html',
        controller: 'EvaluationDashboardCtrl',
        controllerAs: 'evaluationDashboardCtrl',
        resolve: {
          profiles: (MdphResource, currentMdph) => {
            return MdphResource.queryBeneficiaires({zipcode: currentMdph.zipcode}).$promise;
          }
        }
      });
  });

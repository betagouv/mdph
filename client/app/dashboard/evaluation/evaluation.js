'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/evaluation/evaluation.html',
        authenticate: true,
        controller: 'EvaluationCtrl',
        controllerAs: 'evaluationctrl',
        resolve: {
          profiles: (MdphResource, currentMdph) => {
            return MdphResource.queryBeneficiaires({zipcode: currentMdph.zipcode}).$promise;
          }
        }
      });
  });

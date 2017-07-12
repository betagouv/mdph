'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation', {
        url: '/soutien/:codeDepartement',
        resolve: {
          currentMdph: function(MdphResource, $stateParams) {
            if ($stateParams.codeDepartement) {
              return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
            } else {
              return null;
            }
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/evaluation/evaluation.html',
        controller: 'EvaluationCtrl',
        controllerAs: 'evaluationCtrl',
        abstract: true
      });
  });

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/workflow/detail/evaluation/list/list.html',
        controller: 'RequestEvaluationCtrl',
        resolve: {
          sections: function(GevaService) {
            return GevaService.getSections();
          },

          model: function(GevaService) {
            return GevaService.getModel();
          },

          allPrestations: function($http) {
            return $http.get('api/prestations').then(function(result) {
              return result.data;
            });
          },

          currentRequest: function(request) {
            return request;
          },

          profileSyntheses: function(SyntheseResource, request) {
            return SyntheseResource.query({userId: request.user._id, profileId: request.profile}).$promise;
          }
        },
        authenticate: true
      })
      .state('detailEvaluation', {
        url: '/:syntheseId',
        parent: 'dashboard.workflow.detail.evaluation',
        templateUrl: 'app/dashboard/workflow/detail/evaluation/detail/detail.html',
        resolve: {
          profileSynthese: function(SyntheseResource, $stateParams, request) {
            return SyntheseResource.get({userId: request.user._id, profileId: request.profile, syntheseId: $stateParams.syntheseId}).$promise;
          }
        }
      })
      .state('sectionEvaluation', {
        url: '/:sectionId',
        parent: 'detailEvaluation',
        templateUrl: 'app/dashboard/workflow/detail/evaluation/detail/section/section.html',
        controller: 'RequestSectionCtrl',
        resolve: {
          section: function($stateParams, sections, model) {
            var id = $stateParams.sectionId;
            var section = _.find(sections, {id: id});

            return {
              id: section.id,
              label: section.label,
              trajectoires: model[section.libelle]
            };
          }
        },
        authenticate: true
      });
  });

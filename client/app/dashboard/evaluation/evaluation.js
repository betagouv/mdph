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
      })
      .state('dashboard.evaluation.detail', {
        url: '/:profileId/:syntheseId/:sectionId',
        templateUrl: 'app/dashboard/evaluation/detail/detail.html',
        controller: 'DetailEvaluationCtrl',
        authenticate: true,
        resolve: {
          sections: function(GevaService) {
            return GevaService.getSections();
          },

          model: function(GevaService) {
            return GevaService.getModel();
          },

          syntheseId: function($stateParams) {
            return $stateParams.syntheseId;
          },

          profileId: function($stateParams) {
            return $stateParams.profileId;
          },

          listSyntheses: function(SyntheseResource, currentMdph, profileId) {
            return SyntheseResource.query({zipcode: currentMdph.zipcode, profileId: profileId}).$promise;
          },

          sectionId: function($stateParams) {
            return $stateParams.sectionId;
          },

          currentSynthese: function(SyntheseResource, currentMdph, profileId, listSyntheses, syntheseId) {
            let currentSynthese;

            if (syntheseId === 'current') {
              currentSynthese = _.find(listSyntheses, {current: true});
            } else {
              currentSynthese = _.find(listSyntheses, {_id: syntheseId});
            }

            return SyntheseResource.get({zipcode: currentMdph.zipcode, profileId: profileId, controller: 'syntheses', controllerId: currentSynthese._id}).$promise;
          },

          section: function($stateParams, sections, model, sectionId) {
            var section = _.find(sections, {id: sectionId});

            return {
              id: section.id,
              label: section.label,
              trajectoires: model[section.libelle]
            };
          }
        }
      });
  });

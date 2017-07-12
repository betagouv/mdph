'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation.detail', {
        url: '/:profileId/:syntheseId/:sectionId',
        authenticate: true,
        views: {
          '': {
            templateUrl: 'app/evaluation/detail/evaluation.detail.html',
            controller: 'EvaluationDetailCtrl',
            controllerAs: 'evaluationDetailCtrl',
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
          },
          'issues@evaluation.detail': {
            templateUrl: 'app/evaluation/issues/evaluation.issues.html',
            controllerAs: 'evaluationIssuesCtrl',
            controller: function($http, $stateParams) {
              this.loading = true;
              this.toggle = (issue) => {
                $http
                  .put(`api/issues/${issue._id}`)
                  .then(result => {
                    issue.closed = result.data.closed;
                  });
              };

              $http
                .get(`api/issues/${$stateParams.sectionId}`)
                .then(result => {
                  this.issues = result.data;
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            }
          }
        }
      });
  });

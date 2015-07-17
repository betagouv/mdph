'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande.nature_demande', {
        url: '/nature_demande',
        template: '<ui-view></ui-view>',
        controller: 'SectionCtrl',
        redirectTo: 'departement.demande.nature_demande.renouvellement',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'renouvellement'});
          },
          sectionModel: function(request) {
            return request.formAnswers.renouvellement
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.nature_demande.renouvellement', {
        url: '',
        templateUrl: 'components/question/radio.html',
        data: {
          hideBack: true
        },
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'renouvellement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.evolution');
            };
          }
        }
      })
      .state('departement.demande.nature_demande.evolution', {
        url: '/evolution',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'evolution', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.liste_droits');
            };
          }
        }
      });
  });

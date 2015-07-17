'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.nature_demande.renouvellement';

    $stateProvider
      .state(index, {
        url: '/renouvellement',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.condition',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'renouvellement'});
          },
          sectionModel: function(request, section) {
            return request.formAnswers.renouvellement;
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state(index + '.condition' , {
        url: '',
        templateUrl: 'components/question/radio.html',
        data: {
          hideBack: true
        },
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'condition', request.formAnswers);
          },
          nextStep: function($state, sectionModel) {
            return function() {
              if (sectionModel.renouvellement) {
                $state.go('^.evolution');
              } else {
                $state.go('departement.demande.complementaires');
              }
            };
          }
        }
      })
      .state(index + '.evolution', {
        url: '/evolution',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'evolution', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('departement.demande.complementaires');
            };
          }
        }
      });
  });

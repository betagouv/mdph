'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'departement.demande.obligatoire.situations_particulieres';
    $stateProvider
      .state(index, {
        url: '/situations_particulieres',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.detail',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'situations_particulieres'});
          },

          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },

          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state(index + '.detail', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true,
          isLastQuestion: true
        },
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'urgences', request.formAnswers);
          },

          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });

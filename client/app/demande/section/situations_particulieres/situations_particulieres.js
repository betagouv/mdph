'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    $stateProvider.state('departement.demande.situations_particulieres.detail', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      data: {
        hideBack: true,
        isLastQuestion: true
      },
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('contexte', 'urgences', request.formAnswers);
        },
        nextStep: function($state, sectionModel) {
          return function() {
            if (sectionModel.condition) {
              $state.go('^.type_scolaire');
            } else {
              $state.go('^.raison_non_scolaire');
            }
          };
        }
      }
    });
  });

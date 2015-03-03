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
          return QuestionService.get('situationsParticulieres', 'urgences', request.formAnswers);
        },
        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });

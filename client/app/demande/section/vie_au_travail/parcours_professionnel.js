'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_au_travail';

    $stateProvider.state(index + '.parcours_professionnel', {
      url: '/parcours_professionnel',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.parcours_professionnel.cv', {
      url: '/cv',
      templateUrl: 'components/question/cv.html',
      controller: 'CvQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'cv', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.projet_professionnel.description');
          };
        }
      }
    });
  });

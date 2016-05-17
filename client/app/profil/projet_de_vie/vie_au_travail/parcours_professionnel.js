'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_au_travail';

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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'cv', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.qualification');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.qualification', {
      url: '/qualification',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'qualification', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.derniereClasse');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.derniereClasse', {
      url: '/derniere_classe',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'derniereClasse', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.formations');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.formations', {
      url: '/formations',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'formations', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.diplomes');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.diplomes', {
      url: '/diplomes',
      templateUrl: 'components/question/diplomes.html',
      controller: 'ListQuestionCtrl',
      resolve: {
        listName: function() {
          return 'listeDiplomes';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomes', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.^.projet_professionnel.description');
          };
        }
      }
    });
  });

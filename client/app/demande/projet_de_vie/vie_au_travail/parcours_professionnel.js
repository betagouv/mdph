'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_au_travail';

    $stateProvider.state(index + '.parcours_professionnel', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.parcours_professionnel.uploadCV', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'uploadCV', demande);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.needUploadCV) {
              $state.go('^.qualification');
            } else {
              $state.go('^.cv');
            }
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.cv', {
      url: '',
      templateUrl: 'components/question/cv.html',
      controller: 'CvQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'cv', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.qualification');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.qualification', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'qualification', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.derniereClasse');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.derniereClasse', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'derniereClasse', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.formations');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.formations', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'formations', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.diplomes');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.diplomes', {
      url: '',
      templateUrl: 'components/question/diplomes.html',
      controller: 'ListQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        listName: function() {
          return 'listeDiplomes';
        },

        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'diplomes', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.^.projet_professionnel.description');
          };
        }
      }
    });
  });

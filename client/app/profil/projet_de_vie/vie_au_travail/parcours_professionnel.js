'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_au_travail';

    $stateProvider.state(index + '.parcours_professionnel', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.parcours_professionnel.uploadCV', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'uploadCV', profile);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState($state);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'cv', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.qualification');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.qualification', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'qualification', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.derniereClasse');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.derniereClasse', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'derniereClasse', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.formations');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.formations', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'formations', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.diplomes');
          };
        }
      }
    })
    .state(index + '.parcours_professionnel.diplomes', {
      url: '',
      templateUrl: 'components/question/diplomes.html',
      controller: 'ListQuestionCtrl',
      resolve: {
        listName: function() {
          return 'listeDiplomes';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomes', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.^.projet_professionnel.description');
          };
        }
      }
    });
  });

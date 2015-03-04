'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_au_travail.situation_professionnelle.emploi';

    $stateProvider
      .state(index, {
        url: '/emploi',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.nom_poste', {
        url: '/nom_poste',
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'nomPoste', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.temps');
            };
          }
        }
      })
      .state(index + '.temps', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'temps', request.formAnswers);
          },
          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model]) {
                $state.go('^.adapte');
              } else {
                $state.go('^.heures');
              }
            };
          }
        }
      })
      .state(index + '.heures', {
        url: '/heures',
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'heures', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.adapte');
            };
          }
        }
      })
      .state(index + '.adapte', {
        url: '/adapte',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'adapte', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.difficultes');
            };
          }
        }
      })
      .state(index + '.difficultes', {
        url: '/difficultes',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'difficultes', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.amenagement');
            };
          }
        }
      })
      .state(index + '.amenagement', {
        url: '/amenagement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'amenagement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.arret_de_travail');
            };
          }
        }
      })
      .state(index + '.arret_de_travail', {
        url: '/arret_de_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'arretDeTravail', request.formAnswers);
          },
          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model]) {
                $state.go('^.indemnite_journaliere');
              } else {
                $state.go('^.^.^.projet_professionnel.description');
              }
            };
          }
        }
      })
      .state(index + '.indemnite_journaliere', {
        url: '/indemnite_journaliere',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'indemniteJournaliere', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.accident_de_travail');
            };
          }
        }
      })
      .state(index + '.accident_de_travail', {
        url: '/accident_de_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'accidentTravail', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.conge_maternite');
            };
          }
        }
      })
      .state(index + '.conge_maternite', {
        url: '/conge_maternite',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'congeMaternite', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.professionnel_social');
            };
          }
        }
      })
      .state(index + '.professionnel_social', {
        url: '/professionnel_social',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'profesionnelSocial', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.medecin_travail');
            };
          }
        }
      })
      .state(index + '.medecin_travail', {
        url: '/medecin_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'medecinTravail', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.^.^.projet_professionnel.description');
            };
          }
        }
      });
  });

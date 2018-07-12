'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_au_travail.situation_professionnelle.emploi';

    $stateProvider
      .state(index, {
        url: '',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state(index + '.nom_poste', {
        url: '',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'nomPoste', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.temps');
            };
          }
        }
      })
      .state(index + '.temps', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'temps', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.adapte');
            };
          }
        }
      })
      .state(index + '.adapte', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'adapte', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.difficultes');
            };
          }
        }
      })
      .state(index + '.difficultes', {
        url: '',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'difficultes', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.conservation');
            };
          }
        }
      })
      .state(index + '.conservation', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'conservation', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.amenagement');
            };
          }
        }
      })
      .state(index + '.amenagement', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'amenagement', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.arret_de_travail');
            };
          }
        }
      })
      .state(index + '.arret_de_travail', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'arretDeTravail', demande);
          },

          nextStep: function($state, sectionModel, question, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (sectionModel[question.model]) {
                $state.go('^.raison_arret_de_travail');
              } else {
                $state.go('^.^.^.situation_professionnelle.rqth');
              }
            };
          }
        }
      })
      .state(index + '.raison_arret_de_travail', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'arretDeTravailRaison', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.professionnel_social');
            };
          }
        }
      })
      .state(index + '.professionnel_social', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'profesionnelSocial', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.medecin_travail');
            };
          }
        }
      })
      .state(index + '.medecin_travail', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        protected: true,
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'medecinTravail', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.^.^.situation_professionnelle.rqth');
            };
          }
        }
      });
  });

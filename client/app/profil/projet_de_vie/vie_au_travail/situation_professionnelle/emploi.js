'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_au_travail.situation_professionnelle.emploi';

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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'nomPoste', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'temps', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'adapte', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'difficultes', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'conservation', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'amenagement', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'arretDeTravail', profile);
          },

          nextStep: function($state, sectionModel, question, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (sectionModel[question.model]) {
                $state.go('^.raison_arret_de_travail');
              } else {
                $state.go('^.^.^.situation_professionnelle.prestations');
              }
            };
          }
        }
      })
      .state(index + '.raison_arret_de_travail', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'arretDeTravailRaison', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'profesionnelSocial', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'medecinTravail', profile);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.^.^.situation_professionnelle.prestations');
            };
          }
        }
      });
  });

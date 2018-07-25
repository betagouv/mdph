'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'demande.vie_au_travail';

    $stateProvider.state(index + '.situation_professionnelle', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.situation_professionnelle.condition', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      data: {
        isFirstQuestion: true
      },
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'conditionTravail', demande);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.conditionTravail) {
              $state.go('^.milieu');
            } else {
              $state.go('^.sans_emploi.passe');
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.milieu', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'milieuTravail', demande);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.milieuTravail === 'etablissement') {
              $state.go('^.emploi.nom_poste');
            } else {
              $state.go('^.type');
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.type', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'typeTravail', demande);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.typeTravail === 'stagiaire') {
              $state.go('^.stage');
            } else {
              if (sectionModel.typeTravail === 'independant') {
                $state.go('^.emploi.nom_poste');
              } else {
                $state.go('^.employeur');
              }
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.stage', {
<<<<<<< HEAD:client/app/demande/projet_de_vie/vie_au_travail/situation_professionnelle.js
=======
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'situationStage', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi.nom_poste');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.employeur', {
>>>>>>> refs/remotes/origin/master:client/app/profil/projet_de_vie/vie_au_travail/situation_professionnelle.js
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'situationStage', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi.nom_poste');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.employeur', {
      url: '',
      templateUrl: 'components/question/employeur.html',
      authenticate: true,
      authorized: ['user'],
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'employeur', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi.nom_poste');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.prestations', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'prestations', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.rqth');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.rqth', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'rqth', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.^.parcours_professionnel.uploadCV');
          };
        }
      }
    });
  });

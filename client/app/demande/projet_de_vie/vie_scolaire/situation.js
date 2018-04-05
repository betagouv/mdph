'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'demande.vie_scolaire';

    $stateProvider.state(index + '.situation', {
      url: '',
      template: '<div ui-view></div>',
      redirectTo: index + '.situation.condition'
    })
    .state(index + '.situation.condition', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      data: {
        isFirstQuestion: true
      },
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'condition', profile);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.condition) {
              $state.go('^.type_scolaire');
            } else {
              $state.go('^.raison_non_scolaire');
            }
          };
        }
      }
    })
    .state(index + '.situation.type_scolaire', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'vieScolaireType', profile);
        },

        nextStep: function($state, sectionModel, question, saveCurrentState) {
          return function() {
            var model = sectionModel[question.model];
            saveCurrentState();

            switch (model) {
              case 'domicile':
                return $state.go('^.accompagnement');
              case 'superieur':
                return $state.go('^.type_etudes');
              default:
                return $state.go('^.internat');
            }
          };
        }
      }
    })
    .state(index + '.situation.etablissement', {
      url: '',
      templateUrl: 'components/question/etablissement_scolaire.html',
      controller: 'ListQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        listName: function() {
          return 'etablissements';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'etablissement', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.accompagnement');
          };
        }
      }
    })
    .state(index + '.situation.internat', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'internat', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.etablissement');
          };
        }
      }
    })
    .state(index + '.situation.type_etudes', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'typeEtudes', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.diplomes_passes');
          };
        }
      }
    })
    .state(index + '.situation.diplomes_passes', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomePasse', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.diplome_present');
          };
        }
      }
    })
    .state(index + '.situation.diplome_present', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomePresent', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.diplome_etablissement');
          };
        }
      }
    })
    .state(index + '.situation.diplome_etablissement', {
      url: '',
      templateUrl: 'components/question/etablissement_scolaire.html',
      controller: 'ListQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        listName: function() {
          return 'etablissements';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomeEtablissement', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.parcours');
          };
        }
      }
    })
    .state(index + '.situation.parcours', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'parcoursEtudes', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.accompagnement');
          };
        }
      }
    })
    .state(index + '.situation.accompagnement', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'accompagnement', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.adaptation');
          };
        }
      }
    })
    .state(index + '.situation.adaptation', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'adaptation', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.aide_eleve');
          };
        }
      }
    })
    .state(index + '.situation.aide_eleve', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'aideEleve', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi_du_temps');
          };
        }
      }
    })
    .state(index + '.situation.emploi_du_temps', {
      url: '',
      templateUrl: 'components/question/emploi_du_temps.html',
      controller: 'EmploiDuTempsCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'emploiDuTemps', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('demande.vie_scolaire.vos_besoins.scolarite');
          };
        }
      }
    })
    .state(index + '.situation.raison_non_scolaire', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'raisonNonScolaire', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('demande.vie_scolaire.vos_besoins.scolarite');
          };
        }
      }
    });
  });

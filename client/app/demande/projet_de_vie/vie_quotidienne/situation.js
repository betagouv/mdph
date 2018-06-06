'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_quotidienne.situation';
    $stateProvider
      .state(index, {
        url: '',
        template: '<div ui-view></div>',
        redirectTo: index + '.vie_famille'
      })
      .state(index + '.vie_famille', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          isFirstQuestion: true
        },
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'famille', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.logement');
            };
          }
        }
      })
      .state(index + '.logement', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'logement', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.accident');
            };
          }
        }
      })
      .state(index + '.accident', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'accident', demande);
          },

          nextStep: function($state, sectionModel, question, saveCurrentState) {
            return function() {
              saveCurrentState();
              var answer = sectionModel[question.model];
              if (answer && (answer.autre || answer.tiers || answer.travail))
              {
                $state.go('^.indemnisation');
              } else {
                $state.go('^.aides');
              }
            };
          }
        }
      })
      .state(index + '.indemnisation', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'indemnisation', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.aides');
            };
          }
        }
      })
      .state(index + '.aides', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aideActuelle', demande);
          },

          nextStep: function($state, sectionModel, question, saveCurrentState, DemandeService, demande) {
            return function() {
              saveCurrentState();
              var answer = sectionModel[question.model];
              if (!answer) {
                if (DemandeService.estAdulte(demande)) {
                  $state.go('^.retraite');
                } else {
                  $state.go('^.activiteHandicap');
                }
              } else if (answer.financiere) {
                $state.go('^.aideFinancierePresent');
              } else if (answer.technique) {
                $state.go('^.aideTechnique');
              } else if (answer.personne) {
                $state.go('^.aidePersonne');
              }
            };
          }
        }
      })
      .state(index + '.aideFinancierePresent', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aideFinancierePresent', demande);
          },

          nextStep: function(DemandeService, demande, $state, sectionModel, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.aideFinancierePasse');
            };
          }
        }
      })
      .state(index + '.aideFinancierePasse', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aideFinancierePasse', demande);
          },

          nextStep: function(DemandeService, $state, sectionModel, saveCurrentState, demande) {
            return function() {
              saveCurrentState();
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.financiere) {
                $state.go('^.pensionInvalidite');
              } else if (answerAideActuelle.technique) {
                $state.go('^.aideTechnique');
              } else if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (DemandeService.estAdulte(demande)) {
                $state.go('^.retraite');
              } else {
                $state.go('^.activiteHandicap');
              }
            };
          }
        }
      })
      .state(index + '.pensionInvalidite', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'pensionInvalidite', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.ipp');
            };
          }
        }
      })
      .state(index + '.ipp', {
        url: '',
        templateUrl: 'components/question/pourcentageinput.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'ipp', demande);
          },

          nextStep: function(DemandeService, demande, $state, sectionModel, saveCurrentState) {
            return function() {
              saveCurrentState();
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.technique) {
                $state.go('^.aideTechnique');
              } else if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (DemandeService.estAdulte(demande)) {
                $state.go('^.retraite');
              } else {
                $state.go('^.activiteHandicap');
              }
            };
          }
        }
      })
      .state(index + '.aideTechnique', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aideTechnique', demande);
          },

          nextStep: function(DemandeService, $state, sectionModel, saveCurrentState, demande) {
            return function() {
              saveCurrentState();
              if (sectionModel.aideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (DemandeService.estAdulte(demande)) {
                $state.go('^.retraite');
              } else {
                $state.go('^.activiteHandicap');
              }
            };
          }
        }
      })
      .state(index + '.aidePersonne', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aidePersonne', demande);
          },

          nextStep: function(DemandeService, $state, sectionModel, saveCurrentState, demande) {
            return function() {
              saveCurrentState();
              if (DemandeService.estAdulte(demande)) {
                $state.go('^.retraite');
              } else {
                $state.go('^.activiteHandicap');
              }
            };
          }
        }
      })
      .state(index + '.retraite', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'retraite', demande);
          },

          nextStep: function(demande, DemandeService, $state, sectionModel, question, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (sectionModel[question.model]) {
                $state.go('^.aidesRetraite');
              } else if (!DemandeService.estAdulte(demande)) {
                $state.go('^.activiteHandicap');
              } else {
                $state.go('^.fraisHandicap');
              }
            };
          }
        }
      })
      .state(index + '.aidesRetraite', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'aidesRetraite', demande);
          },

          nextStep: function(demande, DemandeService, $state, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (!DemandeService.estAdulte(demande)) {
                $state.go('^.activiteHandicap');
              } else {
                $state.go('^.fraisHandicap');
              }
            };
          }
        }
      })

      .state(index + '.activiteHandicap', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'activiteHandicap', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.remunHandicap');
            };
          }
        }
      })
      .state(index + '.remunHandicap', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'remunHandicap', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.fraisHandicap');
            };
          }
        }
      })
      .state(index + '.fraisHandicap', {
        url: '',
        templateUrl: 'components/question/frais_handicap.html',
        controller: 'ListFraisCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          listName: function() {
            return 'listeFrais';
          },

          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'fraisHandicap', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.^.vos_besoins.quotidien');
            };
          }
        }
      });
  });


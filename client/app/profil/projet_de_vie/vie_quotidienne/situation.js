'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_quotidienne.situation';
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'famille', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'logement', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'accident', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'indemnisation', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideActuelle', profile);
          },

          nextStep: function($state, sectionModel, question, saveCurrentState, ProfileService, profile) {
            return function() {
              saveCurrentState();
              var answer = sectionModel[question.model];
              if (!answer) {
                if (ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideFinancierePresent', profile);
          },

          nextStep: function(ProfileService, profile, $state, sectionModel, saveCurrentState) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideFinancierePasse', profile);
          },

          nextStep: function(ProfileService, $state, sectionModel, saveCurrentState, profile) {
            return function() {
              saveCurrentState();
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.financiere) {
                $state.go('^.pensionInvalidite');
              } else if (answerAideActuelle.technique) {
                $state.go('^.aideTechnique');
              } else if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'pensionInvalidite', profile);
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
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'ipp', profile);
          },

          nextStep: function(ProfileService, profile, $state, sectionModel, saveCurrentState) {
            return function() {
              saveCurrentState();
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.technique) {
                $state.go('^.aideTechnique');
              } else if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideTechnique', profile);
          },

          nextStep: function(ProfileService, $state, sectionModel, saveCurrentState, profile) {
            return function() {
              saveCurrentState();
              if (sectionModel.aideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else if (ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aidePersonne', profile);
          },

          nextStep: function(ProfileService, $state, sectionModel, saveCurrentState, profile) {
            return function() {
              saveCurrentState();
              if (ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'retraite', profile);
          },

          nextStep: function(profile, ProfileService, $state, sectionModel, question, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (sectionModel[question.model]) {
                $state.go('^.aidesRetraite');
              } else if (!ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aidesRetraite', profile);
          },

          nextStep: function(profile, ProfileService, $state, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (!ProfileService.estAdulte(profile)) {
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'activiteHandicap', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'remunHandicap', profile);
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
        resolve: {
          listName: function() {
            return 'listeFrais';
          },

          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'fraisHandicap', profile);
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


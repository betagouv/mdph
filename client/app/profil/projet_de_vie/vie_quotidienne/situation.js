'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_quotidienne.situation';
    $stateProvider
      .state(index, {
        url: '/situation',
        template: '<ui-view/>',
        redirectTo: index + '.vie_famille'
      })
      .state(index + '.vie_famille', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'famille', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.logement');
            };
          }
        }
      })
      .state(index + '.logement', {
        url: '/logement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'logement', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.aides');
            };
          }
        }
      })
      .state(index + '.aides', {
        url: '/aides',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideActuelle', profile);
          },

          nextStep: function($state, sectionModel, question) {
            return function() {
              var answer = sectionModel[question.model];
              if (!answer) {
                $state.go('^.fraisHandicap');
              } else if (answer.financiere) {
                $state.go('^.aideFinancierePresent');
              } else if (answer.technique) {
                $state.go('^.aideTechnique');
              } else if (answer.personne) {
                $state.go('^.aidePersonne');
              } else {
                $state.go('^.fraisHandicap');
              }
            };
          }
        }
      })
      .state(index + '.aideFinancierePresent', {
        url: '/aides_financieres',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideFinancierePresent', profile);
          },

          nextStep: function(ProfileService, profile, $state, sectionModel) {
            return function() {
              if (ProfileService.estAdulte(profile)) {
                $state.go('^.aideFinancierePasse');
              } else {
                var answerAideActuelle = sectionModel.aideActuelle;
                if (answerAideActuelle.technique) {
                  $state.go('^.aideTechnique');
                } else if (answerAideActuelle.personne) {
                  $state.go('^.aidePersonne');
                } else {
                  $state.go('^.pensionInvalidite');
                }
              }
            };
          }
        }
      })
      .state(index + '.aideFinancierePasse', {
        url: '/revenus',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideFinancierePasse', profile);
          },

          nextStep: function($state, sectionModel) {
            return function() {
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.technique) {
                $state.go('^.aideTechnique');
              } else if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else {
                $state.go('^.pensionInvalidite');
              }
            };
          }
        }
      })
      .state(index + '.aideTechnique', {
        url: '/aides_techniques',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aideTechnique', profile);
          },

          nextStep: function($state, sectionModel) {
            return function() {
              var answerAideActuelle = sectionModel.aideActuelle;
              if (answerAideActuelle.personne) {
                $state.go('^.aidePersonne');
              } else {
                $state.go('^.pensionInvalidite');
              }
            };
          }
        }
      })
      .state(index + '.aidePersonne', {
        url: '/aides_personnes',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aidePersonne', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.pensionInvalidite');
            };
          }
        }
      })
      .state(index + '.pensionInvalidite', {
        url: '/pension_invalidite',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'pensionInvalidite', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.ipp');
            };
          }
        }
      })
      .state(index + '.ipp', {
        url: '/taux_ipp',
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'ipp', profile);
          },

          nextStep: function(ProfileService, profile, $state) {
            return function() {
              if (ProfileService.estAdulte(profile)) {
                $state.go('^.retraite');
              } else {
                $state.go('^.fraisHandicap');
              }
            };
          }
        }
      })
      .state(index + '.retraite', {
        url: '/retraite',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'retraite', profile);
          },

          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model]) {
                $state.go('^.aidesRetraite');
              } else {
                $state.go('^.fraisHandicap');
              }
            };
          }
        }
      })
      .state(index + '.aidesRetraite', {
        url: '/aides_retraite',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'aidesRetraite', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.fraisHandicap');
            };
          }
        }
      })
      .state(index + '.fraisHandicap', {
        url: '/frais_handicap',
        templateUrl: 'components/question/frais_handicap.html',
        controller: 'ListQuestionCtrl',
        resolve: {
          listName: function() {
            return 'listeFrais';
          },

          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'fraisHandicap', profile);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.^.vos_besoins.quotidien');
            };
          }
        }
      });
  });

'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_quotidienne';
    $stateProvider
      .state(index + '.situation', {
        url: '/situation',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.situation.vie_famille', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'famille', request.formAnswers);
          },
          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model] === 'etablissement') {
                $state.go('^.^.vos_besoins.quotidien');
              } else {
                $state.go('^.logement');
              }
            };
          }
        }
      })
      .state(index + '.situation.logement', {
        url: '/logement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'logement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.aides');
            };
          }
        }
      })
      .state(index + '.situation.aides', {
        url: '/aides',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'aideActuelle', request.formAnswers);
          },
          nextStep: function($state, sectionModel, question) {
            return function() {

              if (sectionModel[question.model] && sectionModel[question.model].financiere) {
                $state.go('^.aideFinancierePresent');
              } else {
                $state.go('^.fraisHandicap');
              }

            };
          }
        }
      })
      .state(index + '.situation.aideFinancierePresent', {
        url: '/aides_financieres',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'aideFinancierePresent', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.aideFinancierePasse');
            };
          }
        }
      })
      .state(index + '.situation.aideFinancierePasse', {
        url: '/revenus',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'aideFinancierePasse', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.pensionInvalidite');
            };
          }
        }
      })
      .state(index + '.situation.pensionInvalidite', {
        url: '/pension_invalidite',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'pensionInvalidite', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.retraite');
            };
          }
        }
      })
      .state(index + '.situation.retraite', {
        url: '/retraite',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'retraite', request.formAnswers);
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
      .state(index + '.situation.aidesRetraite', {
        url: '/aides_retraite',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'aidesRetraite', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.fraisHandicap');
            };
          }
        }
      })
      .state(index + '.situation.fraisHandicap', {
        url: '/frais_handicap',
        templateUrl: 'components/question/frais_handicap.html',
        controller: 'FraisQuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'fraisHandicap', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.^.vos_besoins.quotidien');
            };
          }
        }
      });
  });

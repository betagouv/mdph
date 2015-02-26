'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    var index = 'departement.demande.vie_scolaire';

    $stateProvider.state(index + '.situation', {
      url: '/situation',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.situation.condition', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      data: {
        hideBack: true
      },
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('scolaire', 'condition', request.formAnswers);
        },
        nextStep: function($state, sectionModel) {
          return function() {
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
      url: '/type_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('scolaire', 'vieScolaireType', request.formAnswers);
        },
        nextStep: function($state, sectionModel, question) {
          return function() {
            if (sectionModel[question.model] !== 'domicile') {
              $state.go('^.etablissement');
            } else {
              $state.go('^.^.vos_attentes.structure');
            }
          };
        }
      }
    })
    .state(index + '.situation.etablissement', {
      url: '/etablissement',
      templateUrl: 'components/question/etablissement_scolaire.html',
      controller: 'EtablissementScolaireCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('scolaire', 'etablissement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.structure');
          };
        }
      }
    })
    .state(index + '.situation.raison_non_scolaire', {
      url: '/raison_non_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('scolaire', 'raisonNonScolaire', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.structure');
          };
        }
      }
    });
  });

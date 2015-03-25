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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'condition', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'vieScolaireType', request.formAnswers);
        },
        nextStep: function($state, sectionModel, question) {
          return function() {
            if (sectionModel[question.model] !== 'domicile') {
              $state.go('^.etablissement');
            } else {
              $state.go('^.^.vos_besoins.scolarite');
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'etablissement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.type_etudes');
          };
        }
      }
    })
    .state(index + '.situation.type_etudes', {
      url: '/type_etudes',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'typeEtudes', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.diplomes_passes');
          };
        }
      }
    })
    .state(index + '.situation.diplomes_passes', {
      url: '/diplomes_passes',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'diplomePasse', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.diplome_present');
          };
        }
      }
    })
    .state(index + '.situation.diplome_present', {
      url: '/diplome',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'diplomePresent', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.diplome_etablissement');
          };
        }
      }
    })
    .state(index + '.situation.diplome_etablissement', {
      url: '/diplome_etablissement',
      templateUrl: 'components/question/etablissement_scolaire.html',
      controller: 'EtablissementScolaireCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'diplomeEtablissement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.parcours');
          };
        }
      }
    })
    .state(index + '.situation.parcours', {
      url: '/parcours',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'parcoursEtudes', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.accompagnement');
          };
        }
      }
    })
    .state(index + '.situation.accompagnement', {
      url: '/accompagnement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'accompagnement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.adaptation');
          };
        }
      }
    })
    .state(index + '.situation.adaptation', {
      url: '/adaptation',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'adaptation', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.emploi_du_temps');
          };
        }
      }
    })
    .state(index + '.situation.emploi_du_temps', {
      url: '/emploi_du_temps',
      templateUrl: 'components/question/emploi_du_temps.html',
      controller: 'EmploiDuTempsCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'emploiDuTemps', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_besoins.scolarite');
          };
        }
      }
    })
    .state(index + '.situation.raison_non_scolaire', {
      url: '/raison_non_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'raisonNonScolaire', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_besoins.scolarite');
          };
        }
      }
    });
  });

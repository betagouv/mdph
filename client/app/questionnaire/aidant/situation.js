'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.aidant.situation';

    $stateProvider
      .state(index, {
        url: '/situation',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.lien', {
        url: '/lien',
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'lien', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.vie');
            };
          }
        }
      })
      .state(index + '.vie', {
        url: '/vie',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'vie', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.emploi');
            };
          }
        }
      })
      .state(index + '.emploi', {
        url: '/emploi',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'emploi', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.nature_aide');
            };
          }
        }
      })
      .state(index + '.nature_aide', {
        url: '/nature_aide',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'natureAide', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.dedommagement');
            };
          }
        }
      })
      .state(index + '.dedommagement', {
        url: '/dedommagement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'dedommagement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.accompagnement');
            };
          }
        }
      })
      .state(index + '.accompagnement', {
        url: '/accompagnement',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'accompagnementAidant', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.soutien');
            };
          }
        }
      })
      .state(index + '.soutien', {
        url: '/soutien',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'soutien', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.empechement');
            };
          }
        }
      })
      .state(index + '.empechement', {
        url: '/empechement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'empechement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.situation_future');
            };
          }
        }
      })
      .state(index + '.situation_future', {
        url: '/situation_future',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'situationFuture', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.renseignements');
            };
          }
        }
      })
      .state(index + '.renseignements', {
        url: '/renseignements',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'demandesAides', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.^.vos_attentes.type_attente');
            };
          }
        }
      });
  });

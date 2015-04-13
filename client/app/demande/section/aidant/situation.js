'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    var index = 'departement.demande.aidant.situation';

    $stateProvider.state(index, {
      url: '/situation',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.nom_aidant', {
      url: '/',
      templateUrl: 'components/question/textinput.html',
      controller: 'QuestionCtrl',
      data: {
        hideBack: true
      },
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'nomAidant', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.date_naissance_aidant');
          };
        }
      }
    })
    .state(index + '.date_naissance_aidant', {
      url: '/date_naissance_aidant',
      templateUrl: 'components/question/date.html',
      controller: 'DateQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'dateNaissanceAidant', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.lien');
          };
        }
      }
    })
    .state(index + '.lien', {
      url: '/lien',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'lien', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'vie', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'emploi', request.formAnswers);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'natureAide', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'dedommagement', request.formAnswers);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'accompagnementAidant', request.formAnswers);
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
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'soutien', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'empechement', request.formAnswers);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'situationFuture', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.type_attente');
          };
        }
      }
    });
  });

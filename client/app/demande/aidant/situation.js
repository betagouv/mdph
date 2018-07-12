'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'demande.aidant.situation';

    $stateProvider.state(index, {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.nom_aidant', {
      url: '',
      templateUrl: 'components/question/textinput.html',
      controller: 'QuestionCtrl',
      data: {
        isFirstQuestion: true
      },
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'nomAidant', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.date_naissance_aidant');
          };
        }
      }
    })
    .state(index + '.date_naissance_aidant', {
      url: '',
      templateUrl: 'components/question/date.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'dateNaissanceAidant', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.adresse_aidant');
          };
        }
      }
    })
    .state(index + '.adresse_aidant', {
      url: '',
      templateUrl: 'components/question/adresse.html',
      controller: 'AdresseCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'adresseAidant', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.lien');
          };
        }
      }
    })
    .state(index + '.lien', {
      url: '',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'lien', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.vie');
          };
        }
      }
    })
    .state(index + '.vie', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'vie', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi');
          };
        }
      }
    })
    .state(index + '.emploi', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'emploi', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.nature_aide');
          };
        }
      }
    })
    .state(index + '.nature_aide', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'natureAide', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.accompagnement');
          };
        }
      }
    })
    .state(index + '.accompagnement', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'accompagnementAidant', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.soutien');
          };
        }
      }
    })
    .state(index + '.soutien', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'soutien', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.empechement');
          };
        }
      }
    })
    .state(index + '.empechement', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'empechement', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.situation_future');
          };
        }
      }
    })
    .state(index + '.situation_future', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'situationFuture', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('demande.aidant.vos_attentes.type_attente');
          };
        }
      }
    });
  });

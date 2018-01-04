'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'profil.aidant.situation';

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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'nomAidant', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'dateNaissanceAidant', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'lien', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'vie', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'emploi', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'natureAide', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'accompagnementAidant', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'soutien', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'empechement', profile);
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
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'situationFuture', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('profil.aidant.vos_attentes.type_attente');
          };
        }
      }
    });
  });

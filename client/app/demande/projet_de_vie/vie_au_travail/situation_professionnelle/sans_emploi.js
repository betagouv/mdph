'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_au_travail.situation_professionnelle.sans_emploi';
    $stateProvider
      .state(index, {
        url: '',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state(index + '.passe', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'passe', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.pole_emploi');
            };
          }
        }
      })
      .state(index + '.pole_emploi', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'situationSansEmploi', demande);
          },

          nextStep: function($state, sectionModel, saveCurrentState) {
            return function() {
              saveCurrentState();
              if (sectionModel.situationSansEmploi && sectionModel.situationSansEmploi.stagiaire) {
                $state.go('^.stage');
              } else {
                $state.go('^.accompagnement');
              }
            };
          }
        }
      })
      .state(index + '.stage', {
        url: '',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'situationStage', demande);
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
            return QuestionService.get(section, 'situationAccompagnement', demande);
          },

          nextStep: function($state, saveCurrentState) {
            return function() {
              saveCurrentState();
              $state.go('^.^.^.situation_professionnelle.prestations');
            };
          }
        }
      });
  });

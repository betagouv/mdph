'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_au_travail.situation_professionnelle.sans_emploi';
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'passe', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'situationSansEmploi', profile);
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
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'situationStage', profile);
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
            return QuestionService.get(section, 'situationAccompagnement', profile);
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

'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'profil.vie_au_travail';

    $stateProvider.state(index + '.situation_professionnelle', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.situation_professionnelle.condition', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      data: {
        isFirstQuestion: true
      },
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'conditionTravail', profile);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.conditionTravail) {
              $state.go('^.milieu');
            } else {
              $state.go('^.sans_emploi.passe');
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.milieu', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'milieuTravail', profile);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.milieuTravail === 'etablissement') {
              $state.go('^.emploi.nom_poste');
            } else {
              $state.go('^.type');
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.type', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'typeTravail', profile);
        },

        nextStep: function($state, sectionModel, saveCurrentState) {
          return function() {
            saveCurrentState();
            if (sectionModel.typeTravail === 'independant') {
              $state.go('^.emploi.nom_poste');
            } else {
              $state.go('^.employeur');
            }
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.employeur', {
      url: '',
      templateUrl: 'components/question/employeur.html',
      controller: function($scope, question, prevStep, nextStep) {
        if (angular.isUndefined($scope.sectionModel.employeur)) {
          $scope.sectionModel.employeur = {
            nom: {label: 'Nom', value: ''},
            adresse: {label: 'Adresse', value: ''},
            medecin: {label: 'Service/Médecin', value: ''}
          };
        }

        $scope.question = question;
        $scope.nextStep = nextStep;
        $scope.prevStep = prevStep;
        $scope.model = $scope.sectionModel.employeur;
      },

      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'employeur', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.emploi.nom_poste');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.prestations', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'prestations', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.rqth');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.rqth', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'rqth', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.^.parcours_professionnel.uploadCV');
          };
        }
      }
    });
  });

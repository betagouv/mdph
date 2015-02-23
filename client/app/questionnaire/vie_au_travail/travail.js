'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.vie_au_travail';

    $stateProvider
      // Situation professionnelle
      .state(index + '.situation_professionnelle', {
        url: '/situation_professionnelle',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.situation_professionnelle.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'conditionTravail', request.formAnswers);
          },
          nextStep: function($state, sectionModel) {
            return function() {
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
        url: '/milieu',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'milieuTravail', request.formAnswers);
          },
          nextStep: function($state, sectionModel) {
            return function() {
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
        url: '/type',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'typeTravail', request.formAnswers);
          },
          nextStep: function($state, sectionModel) {
            return function() {
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
        url: '/employeur',
        templateUrl: 'components/question/employeur.html',
        controller: function($scope, question, nextStep) {
          if (angular.isUndefined($scope.sectionModel.employeur)) {
            $scope.sectionModel.employeur = {
              nom: {label: 'Nom', value: ''},
              adresse: {label: 'Adresse', value: ''},
              medecin: {label: 'Service/Médecin', value: ''}
            };
          }

          $scope.question = question;
          $scope.nextStep = nextStep;
          $scope.model = $scope.sectionModel.employeur;
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'employeur', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.emploi.nom_poste');
            };
          }
        }
      })

      // Projet professionnel
      .state(index + '.projet_professionnel', {
        url: '/projet_professionnel',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.projet_professionnel.description', {
        url: '/description',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'description', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.besoin_soutien');
            };
          }
        }
      })
      .state(index + '.projet_professionnel.besoin_soutien', {
        url: '/besoin_soutien',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'besoinSoutien', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.structure');
            };
          }
        }
      })
      .state(index + '.projet_professionnel.structure', {
        url: '/structure',
        templateUrl: 'components/question/structure.html',
        controller: 'StructureQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'structure', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.autres_renseignements');
            };
          }
        }
      })
      .state(index + '.projet_professionnel.autres_renseignements', {
        url: '/autres_renseignements',
        templateUrl: 'components/question/autres_renseignements.html',
        controller: 'RenseignementsQuestionCtrl',
        data: {
          isLastQuestion: true
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'autresRenseignements', request.formAnswers);
          },
          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });

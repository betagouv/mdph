'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'espace_perso.mes_profils.profil.vie_au_travail';

    $stateProvider.state(index + '.situation_professionnelle', {
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'conditionTravail', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'milieuTravail', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'typeTravail', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'employeur', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.emploi.nom_poste');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.prestations', {
      url: '/prestaions',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'prestations', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.rqth');
          };
        }
      }
    })
    .state(index + '.situation_professionnelle.rqth', {
      url: '/rqth',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'rqth', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.^.parcours_professionnel.cv');
          };
        }
      }
    });
  });

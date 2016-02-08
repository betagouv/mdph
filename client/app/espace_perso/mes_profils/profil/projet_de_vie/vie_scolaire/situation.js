'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'espace_perso.mes_profils.profil.vie_scolaire';

    $stateProvider.state(index + '.situation', {
      url: '/situation',
      template: '<ui-view/>',
      redirectTo: index + '.situation.condition'
    })
    .state(index + '.situation.condition', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      data: {
        hideBack: true
      },
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'condition', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'vieScolaireType', profile);
        },

        nextStep: function($state, sectionModel, question) {
          return function() {
            var model = sectionModel[question.model];

            switch (model) {
              case 'domicile':
                return $state.go('^.accompagnement');
              case 'superieur':
                return $state.go('^.type_etudes');
              default:
                return $state.go('^.internat');
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'etablissement', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.accompagnement');
          };
        }
      }
    })
    .state(index + '.situation.internat', {
      url: '/internat',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'internat', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.etablissement');
          };
        }
      }
    })
    .state(index + '.situation.type_etudes', {
      url: '/type_etudes',
      templateUrl: 'components/question/textarea.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'typeEtudes', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomePasse', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomePresent', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'diplomeEtablissement', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'parcoursEtudes', profile);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'accompagnement', profile);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'adaptation', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'emploiDuTemps', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('espace_perso.mes_profils.profil.vie_scolaire.vos_besoins.scolarite');
          };
        }
      }
    })
    .state(index + '.situation.raison_non_scolaire', {
      url: '/raison_non_scolaire',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'raisonNonScolaire', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('espace_perso.mes_profils.profil.vie_scolaire.vos_besoins.scolarite');
          };
        }
      }
    });
  });

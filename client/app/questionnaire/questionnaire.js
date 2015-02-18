'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire', {
        url: '/questionnaire/:id',
        templateUrl: 'app/questionnaire/questionnaire.html',
        controller: 'QuestionnaireCtrl',
        resolve: {
          request: function($stateParams, $sessionStorage, RequestResource, mdph) {
            if ($stateParams.id === 'nouvelle_demande') {
              if (typeof $sessionStorage.request === 'undefined') {
                $sessionStorage.request = { formAnswers: {}, steps: [{ name: 'questionnaire', state: 'en_cours' }], mdph: mdph};
              }
              return new RequestResource($sessionStorage.request);
            }

            return RequestResource.get({shortId: $stateParams.id}, function(request) {
              if (!request.formAnswers) {
                request.formAnswers = {};
              }
            }).$promise;
          }
        }
      })

      // Sections
      .state('departement.questionnaire.identite', {
        url: '/identite',
        templateUrl: 'app/questionnaire/identite/identite.html',
        controller: 'IdentiteCtrl',
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.identite)) {
              request.formAnswers.identite = {};
            }

            return request.formAnswers.identite;
          }
        }
      })
      .state('departement.questionnaire.autorite', {
        url: '/autorite',
        templateUrl: 'app/questionnaire/autorite/autorite.html',
        controller: 'AutoriteCtrl',
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.autorite)) {
              request.formAnswers.autorite = {};
            }

            return request.formAnswers.autorite;
          }
        }
      })
      .state('departement.questionnaire.vie_quotidienne', {
        url: '/vie_quotidienne',
        templateUrl: 'app/questionnaire/vie_quotidienne/vie_quotidienne.html',
        controller: 'VieQuotidienneCtrl',
        abstract: true,
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.vieQuotidienne)) {
              request.formAnswers.vieQuotidienne = {};
            }

            return request.formAnswers.vieQuotidienne;
          }
        }
      })
      .state('departement.questionnaire.vie_scolaire', {
        url: '/vie_scolaire',
        templateUrl: 'app/questionnaire/vie_scolaire/scolaire.html',
        controller: 'ScolaireCtrl',
        abstract: true,
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.scolaire)) {
              request.formAnswers.scolaire = {};
            }

            return request.formAnswers.scolaire;
          }
        }
      })
      .state('departement.questionnaire.vie_au_travail', {
        url: '/vie_au_travail',
        templateUrl: 'app/questionnaire/vie_au_travail/travail.html',
        controller: 'TravailCtrl',
        abstract: true,
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.travail)) {
              request.formAnswers.travail = {};
            }

            return request.formAnswers.travail;
          }
        }
      })
      .state('departement.questionnaire.renouvellement', {
        url: '/renouvellement',
        templateUrl: 'app/questionnaire/renouvellement/renouvellement.html',
        controller: 'RenouvellementsCtrl',
        abstract: true,
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.detailRenouvellement)) {
              request.formAnswers.detailRenouvellement = {};
            }

            return request.formAnswers.detailRenouvellement;
          }
        }
      })
      .state('departement.questionnaire.aidant', {
        url: '/aidant',
        templateUrl: 'app/questionnaire/aidant/aidant.html',
        controller: 'AidantCtrl',
        abstract: true,
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.aidant)) {
              request.formAnswers.aidant = {};
            }

            return request.formAnswers.aidant;
          }
        }
      })
      .state('departement.questionnaire.aide_partenaire', {
        url: '/contact_partenaire',
        templateUrl: 'app/questionnaire/aide_partenaire/aide_partenaire.html',
        controller: 'AidePartenaireCtrl',
        resolve: {
          sectionModel: function(request) {
            if (angular.isUndefined(request.formAnswers.aidePartenaire)) {
              request.formAnswers.aidePartenaire = {};
            }

            return request.formAnswers.aidePartenaire;
          }
        }
      })

      // Modale de login/signup
      .state('departement.questionnaire.modal', {
        abstract: true,
        onEnter: function($rootScope, $modal, $state) {
          $modal.open({
            template: '<div ui-view="modal"></div>',
            backdrop: true,
            windowClass: 'right fade',
            controller: 'ModalLoginCtrl'
          }).result.then(function() {
            $rootScope.$broadcast('logged-in-save-request');
            $state.go('departement.questionnaire');
          }, function() {
            $state.go('departement.questionnaire');
          });
        }
      })
      .state('departement.questionnaire.modal.login', {
        url: '/login',
        views: {
          'modal@': {
            templateUrl: 'components/modal/login.html'
          }
        }
      })
      .state('departement.questionnaire.modal.signup', {
        url: '/signup',
        views: {
          'modal@': {
            templateUrl: 'components/modal/signup.html'
          }
        }
      });
  });

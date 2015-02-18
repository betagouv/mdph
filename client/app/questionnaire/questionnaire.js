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
              $sessionStorage.request = request;
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
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.identite)) {
              $sessionStorage.request.formAnswers.identite = {};
            }

            return $sessionStorage.request.formAnswers.identite;
          }
        }
      })
      .state('departement.questionnaire.vie_quotidienne', {
        url: '/vie_quotidienne',
        templateUrl: 'app/questionnaire/vie_quotidienne/vie_quotidienne.html',
        controller: 'VieQuotidienneCtrl',
        abstract: true,
        resolve: {
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.vieQuotidienne)) {
              $sessionStorage.request.formAnswers.vieQuotidienne = {};
            }

            return $sessionStorage.request.formAnswers.vieQuotidienne;
          }
        }
      })
      .state('departement.questionnaire.vie_scolaire', {
        url: '/vie_scolaire',
        templateUrl: 'app/questionnaire/vie_scolaire/scolaire.html',
        controller: 'ScolaireCtrl',
        abstract: true,
        resolve: {
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.scolaire)) {
              $sessionStorage.request.formAnswers.scolaire = {};
            }

            return $sessionStorage.request.formAnswers.scolaire;
          }
        }
      })
      .state('departement.questionnaire.vie_au_travail', {
        url: '/vie_au_travail',
        templateUrl: 'app/questionnaire/vie_au_travail/travail.html',
        controller: 'TravailCtrl',
        abstract: true,
        resolve: {
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.travail)) {
              $sessionStorage.request.formAnswers.travail = {};
            }

            return $sessionStorage.request.formAnswers.travail;
          }
        }
      })
      .state('departement.questionnaire.renouvellement', {
        url: '/renouvellement',
        templateUrl: 'app/questionnaire/renouvellement/renouvellement.html',
        controller: 'RenouvellementsCtrl',
        abstract: true,
        resolve: {
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.detailRenouvellement)) {
              $sessionStorage.request.formAnswers.detailRenouvellement = {};
            }

            return $sessionStorage.request.formAnswers.detailRenouvellement;
          }
        }
      })
      .state('departement.questionnaire.aidant', {
        url: '/aidant',
        templateUrl: 'app/questionnaire/aidant/aidant.html',
        controller: 'AidantCtrl',
        abstract: true,
        resolve: {
          sectionModel: function($sessionStorage) {
            if (angular.isUndefined($sessionStorage.request.formAnswers.aidant)) {
              $sessionStorage.request.formAnswers.aidant = {};
            }

            return $sessionStorage.request.formAnswers.aidant;
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

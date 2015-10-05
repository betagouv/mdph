'use strict';

angular.module('impactApp')
  .config(function($stateProvider, allSteps) {
    var createDefaultStep = function(step) {
      $stateProvider.state('departement.demande.' + step.id, {
        url: '/' + step.id,
        templateUrl: 'app/demande/steps/section-list.html',
        controller: 'StepCtrl',
        authenticate: true,
        resolve: {
          step: function() {
            return step;
          },

          stepSections: function(sections) {
            return _.filter(sections, {group: step.id});
          },

          updateRequest: function(mainUpdateRequest) {
            return function() {
              mainUpdateRequest('departement.demande.' + step.id);
            };
          }
        }
      });
    };

    _.chain(allSteps)
      .filter({isDefault: true})
      .map(createDefaultStep)
      .value();

    $stateProvider.state('departement.demande.documents', {
        url: '/documents',
        authenticate: true,
        resolve: {
          step: function() {
            return _.find(allSteps, {id: 'documents'});
          }
        },
        views: {
          '': {
            templateUrl: 'app/demande/steps/documents/documents.html',
            controller: function($scope, step) {
              $scope.step = step;
            }
          },
          'login@departement.demande.documents': {
            templateUrl: 'components/login/login.html',
            controller: 'LoginStepCtrl',
            resolve: {
              afterLogin: function($state, $rootScope, $window, request) {
                return function() {
                  $rootScope.$broadcast('saving', 'pending');
                  request.$save(function() {
                    $rootScope.$broadcast('saving', 'success');
                    $state.go('departement.demande.documents', {shortId: request.shortId});
                  },

                  function(err) {
                    $rootScope.$broadcast('saving', 'error');
                    $window.alert(err.data.message);
                  });
                };
              }
            }
          },
          'suggestions@departement.demande.documents': {
            templateUrl: 'app/demande/steps/documents/suggestions/suggestions.html',
            controller: function($scope, PreparationEvaluationService, request) {
              $scope.docsList = PreparationEvaluationService.getSuggestedDocsList(request.formAnswers);
            }
          },
          'obligatoires@departement.demande.documents': {
            templateUrl: 'app/demande/steps/documents/obligatoires/obligatoires.html',
            controller: 'DocumentsObligatoiresCtrl'
          },
          'complementaires@departement.demande.documents': {
            templateUrl: 'app/demande/steps/documents/complementaires/complementaires.html',
            controller: 'DocumentsComplementairesCtrl'
          }
        }
      })
      .state('departement.demande.settings', {
        url: '/parametres',
        authenticate: true,
        resolve: {
          knownUsers: function(request) {
            return _.values(request.formAnswers.identites);
          }
        },
        views: {
          '': {
            templateUrl: 'app/demande/steps/settings/settings.html'
          },
          'transfer@departement.demande.settings': {
            templateUrl: 'app/demande/steps/settings/transfer/transfer.html',
            controller: function($scope, request, User, knownUsers, $state) {
              $scope.knownUsers = knownUsers;

              $scope.select = function(email) {
                $scope.email = email;
              };

              $scope.ok = function(form) {
                $scope.userNotFound = false;

                if (form.$valid) {
                  User.search({email: $scope.email}, function(user) {
                    request.$transfer({target: user._id}, function() {
                      $state.go('espace_perso.liste_demandes');
                    });
                  },

                  function() {
                    $scope.userNotFound = $scope.email;
                  });
                }
              };
            }
          }
        }
      });
  });

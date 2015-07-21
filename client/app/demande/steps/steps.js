'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, allSteps) {

    var createDefaultStep = function(step) {
      $stateProvider.state('departement.demande.' + step.id, {
        url: '/' + step.id,
        templateUrl: 'app/demande/steps/section-list.html',
        controller: 'StepCtrl',
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
    }

    _.chain(allSteps)
      .filter({'isDefault': true})
      .map(createDefaultStep)
      .value();

    $stateProvider.state('departement.demande.documents', {
        url: '/documents',
        resolve: {
          step: function() {
            return _.find(allSteps, {id: 'documents'});
          }
        },
        views: {
          '': {
            templateUrl: 'app/demande/steps/documents/step.html',
            controller: 'DocumentsCtrl'
          },
          'login@departement.demande.documents': {
            templateUrl: 'components/login/login.html',
            controller: 'LoginStepCtrl',
            resolve: {
              afterLogin: function() {
                return function() {
                  console.log('success');
                };
              }
            }
          },
          // 'suggestions@departement.demande.documents': {
          //   templateUrl: 'app/demande/steps/steps.html',
          //   controller: function ($scope, PreparationEvaluationService, request) {
          //     $scope.docsList = PreparationEvaluationService.getSuggestedDocsList(request.formAnswers);
          //   }
          // },
          // 'obligatoires@departement.demande.documents': {
          //   templateUrl: 'app/demande/steps/steps.html',
          //   controller: function ($scope, allSteps) {
          //     $scope.steps = allSteps;
          //     $scope.isStepComplete = function(step) {

          //     }
          //   }
          // },
          // 'complementaires@departement.demande.documents': {
          //   templateUrl: 'app/demande/body/body.html'
          // }
        }
      });
  });

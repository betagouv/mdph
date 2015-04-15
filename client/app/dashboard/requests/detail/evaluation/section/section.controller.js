'use strict';

angular.module('impactApp')
  .controller('RequestSectionCtrl', function ($scope, $stateParams, $state, GevaService, request) {
    $scope.currentSection = _.find($scope.sections, {id: $stateParams.sectionId});

    request.synthese.geva[$stateParams.sectionId]={};

    $scope.validate = function() {
      _.forEach($scope.currentSection.questions, function (question) {
        getSectionAnswers(question);
      });
      request.$update();
      GevaService.validate($scope.currentSection);
      $state.go('^');
    };

    function getSectionAnswers (question) {
      if (question.selected){
        getOneAnswer(question);
      }
      else {
        getMultipleAnswers(question);
      }
    }

    function getOneAnswer (question) {
      var answersByNumber = _.indexBy(question[0].Reponses, 'Tri');
      if (!request.synthese.geva[$stateParams.sectionId][question[0].Description]){
        request.synthese.geva[$stateParams.sectionId][question[0].Description] = [];
      }
      request.synthese.geva[$stateParams.sectionId][question[0].Description].push(answersByNumber[question.selected].CodeValeur);
    }

    function getMultipleAnswers (question) {
      _.forEach(question[0].Reponses, function (answer){
        if (answer.selected) {
          if (!request.synthese.geva[$stateParams.sectionId][question[0].Description]){
            request.synthese.geva[$stateParams.sectionId][question[0].Description] = [];
          }
          request.synthese.geva[$stateParams.sectionId][question[0].Description].push(answer.CodeValeur);
          if (answer.Details) {
            _.forEach(answer.Details, function (detail) {
              getDetailedAnswers (question, detail);
            });
          }
        }
      });
    }

    function getDetailedAnswers (question, detail) {
      if (detail.selected) {
        request.synthese.geva[$stateParams.sectionId][question[0].Description].push(detail.CodeValeur);
        if (detail.SousDetails) {
           _.forEach(detail.SousDetails, function (sousDetail) {
            if (sousDetail.selected) {
              request.synthese.geva[$stateParams.sectionId][question[0].Description].push(sousDetail.CodeValeur);
            }
          });
        }
      }
    }
  });

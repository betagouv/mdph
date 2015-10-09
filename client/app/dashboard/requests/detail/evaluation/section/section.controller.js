'use strict';

angular.module('impactApp')
  .controller('RequestSectionCtrl', function($scope, $stateParams, $state, section, GevaService, request) {
    $scope.section = section;

    if (!request.synthese) {
      request.synthese = {};
    }

    if (!request.synthese.geva) {
      request.synthese.geva = {};
    }

    $scope.geva = request.synthese.geva;

    $scope.isSelected = function(question, answer) {
      if (question.Type === 'CU') {
        return $scope.geva[question.Question] && $scope.geva[question.Question].reponse === answer.id;
      } else {
        return $scope.geva[question.Question] && $scope.geva[question.Question][answer.id];
      }
    };

    $scope.isDetailSelected = function(question, detail) {
      return $scope.geva[question.Question] && $scope.geva[question.Question][detail.id];
    };

    $scope.remove = function(question) {
      delete $scope.geva[question];
    };

    $scope.validate = function() {
      request.$update(function() {
        $state.go('^');
      });
    };
  });

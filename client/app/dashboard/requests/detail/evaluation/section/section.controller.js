'use strict';

angular.module('impactApp')
  .controller('RequestSectionCtrl', function($scope, $stateParams, $state, section, GevaService, request) {
    $scope.section = section;
    if (!request.synthese.geva[section.id]) {
      request.synthese.geva[section.id] = {};
    }

    var currentModel = request.synthese.geva[section.id];
    $scope.currentModel = currentModel;

    $scope.isSelected = function(question, answer) {
      if (question.Type === 'CU') {
        return currentModel[question.Question] === answer.CodeValeur;
      } else {
        return currentModel[question.Question] && currentModel[question.Question][answer.CodeValeur];
      }
    };

    $scope.isDetailSelected = function(question, detail) {
      return currentModel[question.Question] && currentModel[question.Question][detail.CodeValeur];
    };

    $scope.validate = function() {
      request.$update(function() {
        $state.go('^');
      });
    };
  });

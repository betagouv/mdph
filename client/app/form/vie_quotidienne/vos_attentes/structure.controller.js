'use strict';

angular.module('impactApp')
  .controller('AttenteStructureCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienneStructure', $scope.formAnswers);
    $scope.model = $scope.sectionModel[$scope.question.model];

    if (angular.isUndefined($scope.model)) {
      $scope.model = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }

    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });

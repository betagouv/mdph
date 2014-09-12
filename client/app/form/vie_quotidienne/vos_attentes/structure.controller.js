'use strict';

angular.module('impactApp')
  .controller('AttenteStructureCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienneStructure', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel[$scope.question.model])) {
      $scope.sectionModel[$scope.question.model] = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }
    
    $scope.model = $scope.sectionModel[$scope.question.model];

    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });

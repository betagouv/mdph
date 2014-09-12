'use strict';

angular.module('impactApp')
  .controller('TypeAideCtrl', function ($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.attentesTypeAide)) {
      $scope.sectionModel.attentesTypeAide = {};
    }

    $scope.question = QuestionService.get('attentesTypeAide', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });

'use strict';

angular.module('impactApp')
  .controller('DeplacementCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.besoinsDeplacement)) {
      $scope.sectionModel.besoinsDeplacement = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsDeplacement', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.transport');
    };
  });

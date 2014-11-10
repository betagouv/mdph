'use strict';

angular.module('impactApp')
  .controller('QuotidienCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.besoinsVie)) {
      $scope.sectionModel.besoinsVie = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsVie', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.deplacement');
    };
  });

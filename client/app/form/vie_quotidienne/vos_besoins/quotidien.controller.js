'use strict';

angular.module('impactApp')
  .controller('QuotidienCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.subSectionModel.besoinsVie)) {
      $scope.subSectionModel.besoinsVie = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsVie', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.deplacement');
    };
  });

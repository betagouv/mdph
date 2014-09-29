'use strict';

angular.module('impactApp')
  .controller('LieuDeVieCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.besoinsLieuDeVie)) {
      $scope.sectionModel.besoinsLieuDeVie = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsLieuDeVie', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.sections[2].isEnabled = true;
      $state.go('^.^.vos_attentes.type_aide');
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:PoleEmploiCtrl
 * @description
 * # PoleEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccompagnementCtrl', function($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('travail', 'situationAccompagnement', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.situationAccompagnement)) {
      $scope.sectionModel.situationAccompagnement = {};
    }

    $scope.model = $scope.sectionModel.situationAccompagnement;

    $scope.nextStep = function() {
      $state.go('^.^.^.projet_professionnel.description');
    };
  });

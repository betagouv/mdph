'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:PoleEmploiCtrl
 * @description
 * # PoleEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('PoleEmploiCtrl', function($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('travail', 'situationSansEmploi', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.situationSansEmploi)) {
      $scope.sectionModel.situationSansEmploi = {};
    }

    $scope.model = $scope.sectionModel.situationSansEmploi;

    $scope.nextStep = function() {
      if ($scope.model.stagiaire) {
        $state.go('^.stage');
      } else {
        $state.go('^.accompagnement');
      }

    };
  });

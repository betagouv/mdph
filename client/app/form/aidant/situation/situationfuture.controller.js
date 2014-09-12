'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationFutureCtrl
 * @description
 * # SituationFutureCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationFutureCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'situationFuture', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.situationFuture)) {
      $scope.sectionModel.situationFuture = {};
    }

    $scope.model= $scope.sectionModel.situationFuture;

    $scope.nextStep = function() {
      $state.go('^.renseignements');
    };
  });

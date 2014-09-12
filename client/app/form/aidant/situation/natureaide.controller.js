'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NatureAideCtrl
 * @description
 * # NatureAideCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NatureAideCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'natureAide', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.natureAide)) {
      $scope.sectionModel.natureAide = {};
    }

    $scope.model= $scope.sectionModel.natureAide;

    $scope.nextStep = function() {
      $state.go('^.nature_aide_bis');
    };
  });

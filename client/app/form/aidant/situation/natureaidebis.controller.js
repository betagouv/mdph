'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NatureAideBisCtrl
 * @description
 * # NatureAideBisCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NatureAideBisCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'natureAideBis', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.natureAideBis)) {
      $scope.sectionModel.natureAideBis = {};
    }

    $scope.model= $scope.sectionModel.natureAide;

    $scope.nextStep = function() {
      $state.go('^.dedommagement');
    };
  });

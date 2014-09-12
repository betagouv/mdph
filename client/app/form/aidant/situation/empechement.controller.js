'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmpechementCtrl
 * @description
 * # EmpechementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmpechementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'empechement', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.situation_future');
    };
  });

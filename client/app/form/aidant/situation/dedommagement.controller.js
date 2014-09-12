'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DedommagementCtrl
 * @description
 * # DedommagementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DedommagementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'dedommagement', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.accompagnement');
    };
  });

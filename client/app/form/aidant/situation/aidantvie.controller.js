'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieAidantCtrl
 * @description
 * # VieAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieAidantCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'vie', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.emploi');
    };
  });

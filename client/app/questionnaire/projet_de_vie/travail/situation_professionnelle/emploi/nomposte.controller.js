'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:NomPosteCtrl
 * @description
 * # NomPosteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('NomPosteCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'nomPoste', $scope.formAnswers);

    $scope.checkNextStep = function(value) {
      return value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.temps');
    };
  });

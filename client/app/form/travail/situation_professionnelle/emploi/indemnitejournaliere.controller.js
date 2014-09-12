'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:IndemniteJournaliereCtrl
 * @description
 * # IndemniteJournaliereCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('IndemniteJournaliereCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'indemniteJournaliere', $scope.formAnswers);

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    
    $scope.nextStep = function() {
      $state.go('^.accident_de_travail');
    };
  });

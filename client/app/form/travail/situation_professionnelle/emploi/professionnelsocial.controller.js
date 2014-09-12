'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ProfessionnelSocialCtrl
 * @description
 * # ProfessionnelSocialCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ProfessionnelSocialCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'profesionnelSocial', $scope.formAnswers);

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.nextStep = function() {
      $state.go('^.medecin_travail');
    };
  });

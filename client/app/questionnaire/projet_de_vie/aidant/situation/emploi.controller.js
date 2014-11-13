'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiAidantCtrl
 * @description
 * # EmploiAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiAidantCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'emploi', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.nature_aide');
    };
  });

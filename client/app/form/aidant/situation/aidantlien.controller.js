'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantLienCtrl
 * @description
 * # AidantLienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantLienCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'lien', $scope.formAnswers);

    $scope.model = $scope.sectionModel.lien;

    $scope.nextStep = function() {
      $state.go('^.vie');
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SoutienCtrl
 * @description
 * # SoutienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SoutienCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'soutien', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.soutien)) {
      $scope.sectionModel.soutien = {};
    }

    $scope.nextStep = function() {
      $state.go('^.empechement');
    };
  });

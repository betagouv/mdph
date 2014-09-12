'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinSoutienCtrl
 * @description
 * # BesoinSoutienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinSoutienCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'besoinSoutien', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.besoinSoutien)) {
      $scope.sectionModel.besoinSoutien = {};
    }

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });

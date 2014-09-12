'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccompagnementCtrl
 * @description
 * # AccompagnementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccompagnementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'accompagnement', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.accompagnement)) {
      $scope.sectionModel.accompagnement = {};
    }

    $scope.model= $scope.sectionModel.accompagnement;

    $scope.nextStep = function() {
      $state.go('^.soutien');
    };
  });

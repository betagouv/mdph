'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccompagnementCtrl
 * @description
 * # AccompagnementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccompagnementAidantCtrl', function($scope, $state, QuestionService) {
    $scope.question = QuestionService.get('aidant', 'accompagnementAidant', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.accompagnement)) {
      $scope.sectionModel.accompagnement = {};
    }

    $scope.model= $scope.sectionModel.accompagnement;

    $scope.nextStep = function() {
      $state.go('^.soutien');
    };
  });

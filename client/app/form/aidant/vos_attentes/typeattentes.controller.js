'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeAttenteAidantCtrl
 * @description
 * # TypeAttenteAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeAttenteAidantCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'typeAttente', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.typeAttente)) {
      $scope.sectionModel.typeAttente = {};
    }

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });

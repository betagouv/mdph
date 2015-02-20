'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsAidantCtrl
 * @description
 * # AutresRenseignementsAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsAidantCtrl', function ($scope, $state, QuestionService, saveSection) {

    $scope.question = QuestionService.get('aidant', 'autresRenseignements', $scope.formAnswers);
    $scope.isLastQuestion = true;

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      saveSection();
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsAidantCtrl
 * @description
 * # AutresRenseignementsAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsAidantCtrl', function ($scope, QuestionService) {

    $scope.question = QuestionService.get('aidant', 'autresRenseignements', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });

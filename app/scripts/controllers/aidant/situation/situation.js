'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationAidantCtrl
 * @description
 * # SituationAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationAidantCtrl', function ($scope) {

    if (angular.isUndefined($scope.formAnswers.situation)) {
      $scope.formAnswers.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.formAnswers.situation.answers;
  });

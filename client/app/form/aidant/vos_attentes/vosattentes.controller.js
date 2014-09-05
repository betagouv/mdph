'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VosAttentesAidantCtrl
 * @description
 * # VosAttentesAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VosAttentesAidantCtrl', function ($scope) {
    $scope.$parent.hideSubsections = false;
    
    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.formAnswers.aidant.answers.attentes = {
        label: $scope.title,
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.attentes.answers;
  });

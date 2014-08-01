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

    if (angular.isUndefined($scope.$storage.aidant.answers.situation)) {
      $scope.$storage.aidant.answers.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.aidant.answers.situation.answers;
  });

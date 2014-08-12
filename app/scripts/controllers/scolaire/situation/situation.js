'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationScolaireCtrl
 * @description
 * # SituationScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationScolaireCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.situation)) {
      $scope.sectionModel.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.situation.answers;
  });

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

    if (angular.isUndefined($scope.$storage.scolaire.answers.situation)) {
      $scope.$storage.scolaire.answers.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.scolaire.answers.situation.answers;
  });

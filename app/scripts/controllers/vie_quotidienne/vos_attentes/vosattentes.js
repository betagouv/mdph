'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VosAttentesCtrl
 * @description
 * # VosAttentesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VosAttentesCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.sectionModel.attentes = {
        label: 'Vos attentes pour compenser votre handicap',
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.sectionModel.attentes.answers;
  });

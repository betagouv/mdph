'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VosAttentesVieCtrl
 * @description
 * # VosAttentesVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VosAttentesVieCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.sectionModel.attentes = {
        label: 'Vos attentes pour compenser votre handicap',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.attentes.answers;
  });

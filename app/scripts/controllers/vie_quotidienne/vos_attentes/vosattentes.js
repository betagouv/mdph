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

    if (angular.isUndefined($scope.$storage.vie.answers.attentes)) {
      $scope.$storage.vie.answers.attentes = {
        label: 'Vos attentes pour compenser votre handicap',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.vie.answers.attentes.answers;
  });

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

    if (angular.isUndefined($scope.$storage.vie.answers.attentes)) {
      $scope.$storage.vie.answers.attentes = {
        label: 'Vos attentes pour compenser votre handicap',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.vie.answers.attentes.answers;
  });

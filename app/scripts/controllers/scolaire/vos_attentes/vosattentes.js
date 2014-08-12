'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VosAttentesCtrl
 * @description
 * # VosAttentesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VosAttentesScolairesCtrl', function ($scope) {
    $scope.title = $scope.estRepresentant() ? 'Ses attentes en matière de vie scolaire / étudiante' : 'Vos attentes en matière de vie scolaire / étudiante';

    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.sectionModel.attentes = {
        label: 'Vos attentes en matière de vie scolaire / étudiante',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.attentes.answers;
  });

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

    if (angular.isUndefined($scope.$storage.scolaire.answers.attentes)) {
      $scope.$storage.scolaire.answers.attentes = {
        label: 'Vos attentes en matière de vie scolaire / étudiante',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.scolaire.answers.attentes.answers;
  });

'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationsUrgentesCtrl
 * @description
 * # SituationsUrgentesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationsUrgentesCtrl', function ($scope) {

    if (angular.isUndefined($scope.$storage.contexte.answers.situationsUrgentes)) {
      $scope.$storage.contexte.answers.situationsUrgentes = {
        label: 'Situations urgentes',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.contexte.answers.situationsUrgentes.answers;
  });

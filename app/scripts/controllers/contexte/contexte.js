'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ContexteCtrl
 * @description
 * # ContexteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ContexteCtrl', function ($sessionStorage, $scope) {

    $scope.currentSection = $scope.$storage.sectionContexte;

    if (angular.isUndefined($scope.$storage.contexte)) {
      $scope.$storage.contexte = {
        sectionLabel: 'Contexte',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.contexte.answers;
  });

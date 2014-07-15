'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ScolaireCtrl
 * @description
 * # ScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope) {
    $scope.title = 'Votre scolarité';

    if (angular.isUndefined($scope.data.scolaire)) {
      $scope.data.scolaire = {};
    }

    $scope.model = $scope.data.scolaire;
  });
